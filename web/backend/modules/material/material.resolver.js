import Material from "./material.model.js";
import MaterialService from "./material.service.js";

const materialResolver = {
 Query:{
    listMaterial: async (_, {}) => {
     return await MaterialService.listMaterial();
    },
    getMaterialById: async (_, { id }) => {
     return await MaterialService.getMaterialById(id);
    },
    getMaterialByName: async(_,{ name }) => {
        return await MaterialService.getMaterialByName(name);
    } 
 }  ,
 Mulation:{
    createMaterial: async (_, { name, description }) => {
     return await MaterialService.createMaterial({ name, description });
    },
    updateMaterial: async (_, { id, name, description, price, quantity, image }) => {
     return await MaterialService.updateMaterial(id, { name, description, price, quantity, image });
    },
    deleteMaterial: async (_, { id }) => {
     return await MaterialService.deleteMaterial(id);
    }

 } 
}

export default materialResolver;