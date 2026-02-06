#!/bin/bash

# Script para configurar GitHub y crear el repositorio

echo "=== Configuración de GitHub ==="

# Configurar el repositorio
echo "Configurando repositorio 'crud-gestion-empresarial-bd'..."
gh repo create crud-gestion-empresarial-bd --public --source=. --remote=origin --push

echo "=== Repositorio creado y archivos subidos correctamente ==="