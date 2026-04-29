# Script para Windows pero de PowerShell

Clear-Host

# Busca node.exe automáticamente
$nodePath = @(
    "C:\Program Files\nodejs\node.exe",
    "$env:LOCALAPPDATA\Programs\nodejs\node.exe",
    "$env:APPDATA\npm\node.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $nodePath) {
    Write-Host "ERROR: No se pudo encontrar Node.js" -ForegroundColor Red
    Read-Host "Pulsá Enter para salir"
    exit 1
}

Write-Host "Usando Node.js: $nodePath" -ForegroundColor Green
Write-Host ""
Write-Host ""
Write-Host "------------- LOAD - OPCIÓN PARA CARGAR DATOS DESDE LA API -------------"
Write-Host ""
$opcion = Read-Host "¿Querés cargar datos desde la API? (S o N)"
Write-Host ""
if ($opcion -eq "s" -or $opcion -eq "S") {
    & $nodePath index.js LOAD products
    Write-Host ""
}

Write-Host ""
Write-Host "------------- (1) TEST GET - OBTIENE TODOS LOS PRODUCTOS -------------"
Write-Host ""
& $nodePath index.js GET products

Write-Host ""
Write-Host ""
Write-Host "------------- (2) TEST GET - OBTIENE PRODUCTO POR ID -------------"
Write-Host ""
& $nodePath index.js GET products/1

Write-Host ""
Write-Host ""
Write-Host "------------- (3) TEST GET - OBTIENE PRODUCTO POR TITULO -------------"
Write-Host ""
& $nodePath index.js GET "products/?title=MBJ Women's Solid Short Sleeve Boat Neck V"

Write-Host ""
Write-Host ""
Write-Host "------------- (4) TEST POST - CREA PRODUCTO -------------"
Write-Host ""
& $nodePath index.js POST products "Remera Chinosa Taiwanesca" 15000.35 "ropa de calidad discreta" "Remeras de calidad muy dudosa importadas de China XXL"

Write-Host ""
Write-Host ""
Write-Host "------------- (5) TEST EDIT - EDITA PRODUCTO -------------"
Write-Host ""
& $nodePath index.js EDIT products/8 "Campera Adidas" "" "Campera clásica Adidas, color negro con 3 tiras en amarillo, rojo y verde. Talle M, unisex." "ropa deportiva"

Write-Host ""
Write-Host ""
Write-Host "------------- (6) TEST DELETE - BORRA PRODUCTO -------------"
Write-Host ""
& $nodePath index.js DELETE products/1

Write-Host ""
Write-Host ""
Write-Host "¡PRUEBA TERMINADA! ;D"
Write-Host ""
