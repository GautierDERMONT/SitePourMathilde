// tina/config.js
import { defineConfig } from "@tinacms/cli";

export default defineConfig({
  branch: "main",
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images/recettes",
      publicFolder: "",
    },
  },
  schema: {
    collections: [
      {
        label: "Recettes",
        name: "recettes",
        path: "content/recettes",
        format: "md",
        fields: [
          {
            type: "string",
            label: "Titre",
            name: "title",
            required: true,
          },
          {
            type: "string",
            label: "Catégorie",
            name: "category",
            options: [
              { label: "Petit-déjeuner", value: "petit-dejeuner" },
              { label: "Déjeuner", value: "dejeuner" },
              { label: "Dîner", value: "diner" },
              { label: "Collation", value: "collation" },
              { label: "Dessert", value: "dessert" },
            ],
          },
          {
            type: "string",
            label: "Description",
            name: "description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            label: "Image",
            name: "image",
          },
          {
            type: "string",
            label: "Temps de préparation",
            name: "time",
          },
          {
            type: "string",
            label: "Difficulté",
            name: "difficulty",
            options: [
              { label: "Facile", value: "Facile" },
              { label: "Moyen", value: "Moyen" },
              { label: "Difficile", value: "Difficile" },
            ],
          },
          {
            type: "string",
            label: "Calories",
            name: "calories",
          },
          {
            type: "string",
            label: "Protéines",
            name: "protein",
          },
          {
            type: "string",
            label: "Glucides",
            name: "carbs",
          },
          {
            type: "string",
            label: "Lipides",
            name: "fat",
          },
          {
            type: "object",
            label: "Ingrédients",
            name: "ingredients",
            list: true,
            fields: [
              {
                type: "string",
                label: "Ingrédient",
                name: "item",
              },
            ],
          },
          {
            type: "object",
            label: "Instructions",
            name: "instructions",
            list: true,
            fields: [
              {
                type: "string",
                label: "Étape",
                name: "step",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
        ],
      },
    ],
  },
});