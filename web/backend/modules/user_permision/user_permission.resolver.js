
import UserPermission from "./user_permission.model.js"

const userPermissionResolver = {
    Query: {
        listUserPermissions: async (_,{}) => {
            const result = await UserPermission.find();
            if(!result){
                throw new Error("User permission not found")
            }
            return {
                datas: result,
                success: true,
                message: "List user permission successfully"
            }}
            ,
        getUserPermissionById: async(_,{_id}) => {
            const result = await UserPermission.findById(_id);
            if(!result){
                throw new Error("User permission not found")
            }
            return {
                datas: result,
                success: true,
                message: "Get user permission successfully"
            }
        },
        getUserPermissionByName: async(_,name) => {
            const result = await UserPermission.findOne({ name: name });
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
        addUserPermission: async (_, { name }) => {
            const userPermissions = await UserPermission.findOne({ name: name });
            if(userPermissions){
                throw new Error("User permission already exists")
            }
            const newUserPermission = new UserPermission({
                name: name,
            })
            await newUserPermission.save()
            return {
                success: true,
                message: "Add user permission successfully",
                data: newUserPermission
            }
        },
        deleteUserPermission:async(_,{name})=>{
            const result = await UserPermission.findOneAndDelete({ name: name });
            if(!result){
                throw new Error("User permission not found")
            }
            return {
                datas: result,
                success: true,
                message: "Delete user permission successfully"
            }
        },
        updateUserPermission: async (_,{name, newName})=>{
            const result = await UserPermission.findOneAndUpdate({ name: name },({name:newName}), { new: true });
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
export default userPermissionResolver