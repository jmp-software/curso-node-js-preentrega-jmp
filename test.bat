rem Script Batch para Windows

@echo off
chcp 1252 > nul
cls

echo.
echo.
echo ------------- LOAD - Opción para cargar datos desde la api -------------
echo.
set /p opcion=Queres cargar datos desde la api? (S o N) 
if /i "%opcion%"=="s" (
    call npm start LOAD products
)

echo.
echo.
echo ------------- (1) Test GET - Obtiene todos los productos -------------
call npm run start GET products

echo.
echo.
echo ------------- (2) Test GET - Obtiene producto por id -------------
call npm run start GET products/1

echo.
echo.
echo ------------- (3) Test GET - Obtiene producto por titulo -------------
call npm run start GET "products/?title=MBJ Women's Solid Short Sleeve Boat Neck V"

echo.
echo.
echo ------------- (4) Test POST - Crea producto -------------
call npm run start POST products "Remera Chinosa Taiwanesca" 15000.35 "Remeras de calidad muy dudosa importadas de China XXL" "ropa de calidad discreta" 

echo.
echo.
echo ------------- (5) Test EDIT - Edita producto -------------
call npm run start EDIT products/8 "Campera Adidas" "" "Campera clásica Adidas, color negro con 3 tiras en amarillo, rojo y verde. Talle M, unisex." "ropa deportiva"

echo.
echo.
echo ------------- (6) Test DELETE - Borra producto -------------
call npm run start DELETE products/1

echo.
echo.
echo ¡Prueba terminada! ;D
echo.

pause