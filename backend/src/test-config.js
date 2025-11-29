import ConfigFileService from "./services/config-file-service.js";

const mockData = {
    serverName: "Servidor de Prueba V2",
    password: "1234",
    rconPassword: "mipass",
    map: "zm_zod",
    maxPlayers: 5
};

console.log("Generando configuración de prueba...");

ConfigFileService.generateConfig(mockData)
    .then(result => {
        console.log("¡Prueba finalizada!");
        console.log("Archivo creado en:", result.filePath);
    })
    .catch(err => {
        console.error("Error fatal:", {
            message: err.message,
            statusCode: err.statusCode || 'N/A'
        });
    });