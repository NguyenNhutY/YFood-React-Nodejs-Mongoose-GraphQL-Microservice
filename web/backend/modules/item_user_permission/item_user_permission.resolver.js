
import ItemUserPermission from "./item_user_permission.model.js"

const itemUserPermissionResolver = {
    Query: {
        listUserItemPermissions: async (_,{}) => {
            const result = await ItemUserPermission.find();
            if(!result){
                throw new Error("User permission not found")
            }
            return {
                datas: result,
                success: true,
                message: "List user permission successfully"
            }}
            ,
        getUserItemPermissionById: async(_,{_id}) => {
            const result = await ItemUserPermission.findById(_id);
            if(!result){
                throw new Error("User permission not found")
            }
            return {
                datas: result,
                success: true,
                message: "Get user permission successfully"
            }
        },
        getItemUserPermissionByUserId: async(_,user_id) => {
            const result = await ItemUserPermission.findOne({ user_id: user_id});
            if(!result){
                throw new Error("User permission not found")
            }
            return {
                datas: result,
                success: true,
                message: "Get user permission successfully"
            }
        },
        getItemUserPermissionByUserPermissionId: async(_,user_permission_id) => {
            const result = await ItemUserPermission.findOne({ user_permission_id: user_permission_id});
            if(!result){
                throw new Error("User permission not found")
            }
            return {
                datas: result,
                success: true,
                message: "Get user permission successfully"
            }
        }
    },
    Mutation: {
        addItemUserPermission: async (_, { user_id, user_perminssion_id }) => {
            const itemUserPermissionsbyUserId = await ItemUserPermission.findOne({ user_id: user_id });
            const itemUserPermissionsbyUserPermissionId = await ItemUserPermission.findOne({ user_perminssion_id: user_perminssion_id });

            if(itemUserPermissionsbyUserId && itemUserPermissionsbyUserPermissionId){
                throw new Error("User permission already exists")
            }
            const newItemUserPermission = new ItemUserPermission({
                user_id: user_id,
                user_permission_id: user_permission_id
            })
            await newItemUserPermission.save()
            return {
                success: true,
                message: "Add user permission successfully",
                data: newItemUserPermission
            }
        },
        deleteItemUserPermission:async(_,{_id})=>{
            const result = await ItemUserPermission.findIDAndDelete({ _id: _id });
            if(!result){
                throw new Error("User permission not found")
            }
            return {
                datas: result,
                success: true,
                message: "Delete user permission successfully"
            }
        },
        updateItemUserPermission: async (_,{_id, user_id, user_perminssion_id})=>{
            const result = await ItemUserPermission.findOneAndUpdate({ _id: _id },({user_id:user_id,user_perminssion_id:user_perminssion_id }), { new: true });
            if(!result){
                throw new Error("User permission not found")
            }
            return {
                datas: result,
                success: true,
                message: "Update user permission successfully"
            }
        }
    
}
}
export default itemUserPermissionResolver