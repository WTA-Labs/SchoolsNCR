<#
  Reproject BarangaysNCR.geojson (EPSG:32651, UTM Zone 51N)
  to WGS84 (lon/lat) and write as a JS variable file.
#>
param(
  [string]$In  = ".\layers\BarangaysNCR.geojson",
  [string]$Out = ".\layers\BarangaysNCR_0.js",
  [string]$Var = "json_BarangaysNCR_0"
)

# ── WGS84 / UTM Zone 51N constants ────────────────────────
$PI   = [Math]::PI
$a    = 6378137.0
$f    = 1.0/298.257223563
$b    = $a * (1.0 - $f)
$e2   = 1.0 - ($b/$a)*($b/$a)
$e1sq = $e2 / (1.0 - $e2)
$k0   = 0.9996
$E0   = 500000.0
$lon0 = 123.0   # Central meridian, UTM zone 51 (degrees)

$e1 = (1.0 - [Math]::Sqrt(1.0-$e2)) / (1.0 + [Math]::Sqrt(1.0-$e2))

function Convert-UTM51N-ToWGS84 {
  param([double]$E, [double]$N)

  $M   = $N / $k0
  $mu  = $M / ($a * (1.0 - $e2/4.0 - 3.0*$e2*$e2/64.0 - 5.0*$e2*$e2*$e2/256.0))

  $phi1  = $mu
  $phi1 += (3.0*$e1/2.0 - 27.0*$e1*$e1*$e1/32.0) * [Math]::Sin(2.0*$mu)
  $phi1 += (21.0*$e1*$e1/16.0 - 55.0*$e1*$e1*$e1*$e1/32.0) * [Math]::Sin(4.0*$mu)
  $phi1 += (151.0*$e1*$e1*$e1/96.0) * [Math]::Sin(6.0*$mu)
  $phi1 += (1097.0*$e1*$e1*$e1*$e1/512.0) * [Math]::Sin(8.0*$mu)

  $sinPhi1 = [Math]::Sin($phi1); $cosPhi1 = [Math]::Cos($phi1); $tanPhi1 = [Math]::Tan($phi1)
  $N1  = $a / [Math]::Sqrt(1.0 - $e2*$sinPhi1*$sinPhi1)
  $T1  = $tanPhi1 * $tanPhi1
  $C1  = $e1sq * $cosPhi1 * $cosPhi1
  $R1  = $a*(1.0-$e2) / [Math]::Pow(1.0 - $e2*$sinPhi1*$sinPhi1, 1.5)
  $D   = ($E - $E0) / ($N1 * $k0)
  $D2  = $D*$D; $D3=$D2*$D; $D4=$D3*$D; $D5=$D4*$D; $D6=$D5*$D

  $lat = $phi1 - ($N1*$tanPhi1/$R1)*(
    $D2/2.0 -
    (5.0 + 3.0*$T1 + 10.0*$C1 - 4.0*$C1*$C1 - 9.0*$e1sq)*$D4/24.0 +
    (61.0 + 90.0*$T1 + 298.0*$C1 + 45.0*$T1*$T1 - 252.0*$e1sq - 3.0*$C1*$C1)*$D6/720.0
  )
  $lon = ($D -
    (1.0 + 2.0*$T1 + $C1)*$D3/6.0 +
    (5.0 - 2.0*$C1 + 28.0*$T1 - 3.0*$C1*$C1 + 8.0*$e1sq + 24.0*$T1*$T1)*$D5/120.0
  ) / $cosPhi1

  return @(
    [Math]::Round($lon0 + $lon * 180.0 / $PI, 8),  # longitude
    [Math]::Round($lat * 180.0 / $PI, 8)             # latitude
  )
}

function Convert-RingArray {
  param($ring)
  $out = @()
  foreach ($pt in $ring) {
    $c = Convert-UTM51N-ToWGS84 -E $pt[0] -N $pt[1]
    $out += ,@($c[0], $c[1])
  }
  return ,$out
}

function Convert-Geometry {
  param($geom)
  if ($geom.type -eq "Polygon") {
    $newRings = @()
    foreach ($ring in $geom.coordinates) {
      $newRings += ,(Convert-RingArray -ring $ring)
    }
    $geom.coordinates = $newRings
  } elseif ($geom.type -eq "MultiPolygon") {
    $newPolys = @()
    foreach ($poly in $geom.coordinates) {
      $newRings = @()
      foreach ($ring in $poly) {
        $newRings += ,(Convert-RingArray -ring $ring)
      }
      $newPolys += ,,$newRings
    }
    $geom.coordinates = $newPolys
  }
  return $geom
}

Write-Host "Reading $In ..."
$raw = [System.IO.File]::ReadAllText($In)
Write-Host "Parsing JSON ..."
$fc = $raw | ConvertFrom-Json

Write-Host "Reprojecting $($fc.features.Count) features ..."
$count = 0
foreach ($feat in $fc.features) {
  $feat.geometry = Convert-Geometry -geom $feat.geometry
  $count++
  if ($count % 100 -eq 0) { Write-Host "  $count / $($fc.features.Count)" }
}

# Update CRS to WGS84
$fc.crs = @{ type="name"; properties=@{ name="urn:ogc:def:crs:OGC:1.3:CRS84" } }

Write-Host "Serialising ..."
$json = $fc | ConvertTo-Json -Depth 20 -Compress
$js   = "var $Var = $json;"

Write-Host "Writing $Out ..."
[System.IO.File]::WriteAllText($Out, $js, [System.Text.Encoding]::UTF8)
Write-Host "Done. Output: $Out"
