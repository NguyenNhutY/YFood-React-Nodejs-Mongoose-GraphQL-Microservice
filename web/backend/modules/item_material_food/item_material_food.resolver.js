import Food from '../food/food.model.js';
import Material from '../material/material.model.js';
import MaterialBatch from '../material_batch/material_batch.model.js';
import ItemMaterialFood from './item_material_food.model.js';

const resolvers = {
    Query:{
      getItemMaterialFoods: async () => {
        const result = await ItemMaterialFood.find({});
        return {
          success:true,
          message:"Item Material Food was successfully",
          itemMaterialFood:result
        }
      },
        getItemMaterialFoodByfoodName: async (_, { foodName }) => {
            try {
              const foods = await Food.find({ name: { $regex: foodName, $options: "i" } });
          
              if (!foods || foods.length === 0) {
                return {
                  success: false,
                  itemMaterialFood: [],
                  dataFood: null,
                  dataFoods: [],
                  message: "No food found with the provided name",
                };
              }
          
              const itemMaterialFoods = await ItemMaterialFood.find({
                food_id: { $in: foods.map((food) => food._id) },
              });
          
              return {
                success: true,
                itemMaterialFood: itemMaterialFoods,
                dataFood: foods.length === 1 ? foods[0] : null, // Trả về 1 đối tượng nếu chỉ có 1 Food
                dataFoods: foods.length > 1 ? foods : [],       // Trả về danh sách nếu có nhiều Food
                message: "Item Material Food found by Food name",
              };
            } catch (error) {
              return {
                success: false,
                itemMaterialFood: [],
                dataFood: null,
                dataFoods: [],
                message: error.message,
              };
            }},
          
          
        getItemMaterialFoodByMaterialName: async (_, { materialName }) => {
            try {
              const materials = await Material.find({
                name: { $regex: materialName, $options: "i" },
              });
          
              if (!materials || materials.length === 0) {
                return {
                  success: false,
                  itemMaterialFood: [],
                  dataMaterial: null,
                  dataMaterials: [],
                  message: "No material found with the provided name",
                };
              }
          
              const itemMaterialFoods = await ItemMaterialFood.find({
                material_id: { $in: materials.map((material) => material._id) },
              });
          
              return {
                success: true,
                itemMaterialFood: itemMaterialFoods,
                dataMaterial: materials.length === 1 ? materials[0] : null, // Trả về 1 đối tượng nếu chỉ có 1 Material
                dataMaterials: materials.length > 1 ? materials : [],       // Trả về danh sách nếu có nhiều Material
                message: "Item Material Food found by Material name",
              };
            } catch (error) {
              return {
                success: false,
                itemMaterialFood: [],
                dataMaterial: null,
                dataMaterials: [],
                message: error.message,
              };
            }
          },
        },
  Mutation: {
    addItemMaterialFood: async (_, { foodName, materialName, materialBatchName, quantityRequired }) => {
        try {
          // Tìm kiếm Food và Material
          const food = await Food.findOne({ name: foodName });
          const material = await Material.findOne({ name: materialName });
      
          if (!food ) {
            throw new Error('Food not found');
          }
          if ( !material) {
            throw new Error('Material not found');
          }
          let materialBatch = null;
          if (materialBatchName) {
            materialBatch = await MaterialBatch.findOne({ batchNumber: materialBatchName });
          }
      
          // Kiểm tra nếu ItemMaterialFood đã tồn tại
          const checkItemMaterialFood = await ItemMaterialFood.findOne({
            food_id: food._id,
            material_id: material._id
          });
      
          if (checkItemMaterialFood) {
            throw new Error('Item Material Food already exists');
          }
      
          // Tạo mới ItemMaterialFood
          const newItemMaterialFood = new ItemMaterialFood({
            food_id: food._id,
            material_name: material.name,
            food_name: food.name,
            material_id: material._id,
            material_batch_id: materialBatch ? materialBatch._id : null,
            quantity_required: quantityRequired,
          });
      
          await newItemMaterialFood.save();
      
          // Trả về phản hồi với đầy đủ dữ liệu
          return {
            success: true,
            itemMaterialFood: {
              _id: newItemMaterialFood._id,
              food_id: newItemMaterialFood.food_id,
              material_id: newItemMaterialFood.material_id,
              material_batch_id: newItemMaterialFood.material_batch_id,
              quantity_required: newItemMaterialFood.quantity_required,
            },
            dataFood: food, // Trả về đối tượng Food đầy đủ
            dataMaterial: material, // Trả về đối tượng Material đầy đủ
            message: 'Item Material Food added successfully',
          };
        } catch (error) {
          console.error("Error adding ItemMaterialFood:", error); // In chi tiết lỗi
          return {
            success: false,
            message: error.message,
          };
        }
      }
      
    }

}

export default resolvers;
