-- Truncate Table with Cascade
TRUNCATE TABLE "Place" CASCADE;

-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL;

-- Add Places again
INSERT INTO public."Place" (id, name, address, active, lat, lng, "createdAt", "updatedAt")
VALUES ('1f100a2a-1d49-4b65-912c-8ac662cffe7a', 'Praça "Prof. Dr. Duvilio Aldo Ometto"', 'Santa Rosa, Piracicaba - SP',
        true, -22.6952243,-47.6152809, NOW(), NOW());

INSERT INTO public."Place" (id, name, address, active, lat, lng, "createdAt", "updatedAt")
VALUES ('41aa5635-1e66-42ea-a654-43c852a70f19', 'Parque Jequitibá', 'R. Diácono Jair de Oliveira', 
        true, -23.6050388, -46.812845, NOW(), NOW());

-- Add Bycicles Again
INSERT INTO public."Bicycle" (id, name, code, "placeId", active, "createdAt", "updatedAt")
VALUES ('2946fe30-0e3f-4582-9fc4-c6bfa88e70c7', 'Bicicleta - Praça "Prof. Dr. Duvilio"', 'C6BFA88E70C7',
        '1f100a2a-1d49-4b65-912c-8ac662cffe7a', true, NOW(), NOW());

INSERT INTO public."Bicycle" (id, name, code, "placeId", active, "createdAt", "updatedAt")
VALUES ('2a6aa7db-f7bd-460c-a1f6-b71c31f0a12b', 'Bicicleta - Parque Jequitibá', 'B71C31F0A12B',
        '41aa5635-1e66-42ea-a654-43c852a70f19', true, NOW(), NOW());


