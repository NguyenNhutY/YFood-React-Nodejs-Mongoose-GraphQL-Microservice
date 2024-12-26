import Role from "./role.model.js"

const roleResolvers = {
        Query: {
          listRoles: async () => {
            try {
              const roles = await Role.find();
              return {
                success: true,
                message: "Roles fetched successfully.",
                datas: roles,
              };
            } catch (error) {
              return {
                success: false,
                message: error.message,
              };
            }
          },
          getRoleById: async (_, { _id }) => {
            try {
              const role = await Role.findById(_id);
              if (role) {
                return {
                  success: true,
                  message: "Role found.",
                  data: role,
                };
              }
              return {
                success: false,
                message: "Role not found.",
              };
            } catch (error) {
              return {
                success: false,
                message: error.message,
              };
            }
          },
          getRoleByName: async (_, { name }) => {
            try {
              const role = await Role.findOne({ name });
              if (role) {
                return {
                  success: true,
                  message: "Role found.",
                  data: role,
                };
              }
              return {
                success: false,
                message: "Role not found.",
              };
            } catch (error) {
              return {
                success: false,
                message: error.message,
              };
            }
          },
        },
      
        Mutation: {
          addRole: async (_, { name }) => {
            try {
              const existingRole = await Role.findOne({ name });
              if (existingRole) {
                return {
                  success: false,
                  message: "Role already exists.",
                };
              }
              const newRole = new Role({ name });
              await newRole.save();
              return {
                success: true,
                message: "Role added successfully.",
                data: newRole,
              };
            } catch (error) {
              return {
                success: false,
                message: error.message,
              };
            }
          },
          deleteRole: async (_, { name }) => {
            try {
              const deletedRole = await Role.findOneAndDelete({ name });
              if (deletedRole) {
                return {
                  success: true,
                  message: "Role deleted successfully.",
                  data: deletedRole,
                };
              }
              return {
                success: false,
                message: "Role not found.",
              };
            } catch (error) {
              return {
                success: false,
                message: error.message,
              };
            }
          },
          updateRole: async (_, { name, newName }) => {
            try {
              const updatedRole = await Role.findOneAndUpdate(
                { name },
                { name: newName },
                { new: true }
              );
              if (updatedRole) {
                return {
                  success: true,
                  message: "Role updated successfully.",
                  data: updatedRole,
                };
              }
              return {
                success: false,
                message: "Role not found.",
              };
            } catch (error) {
              return {
                success: false,
                message: error.message,
              };
            }
          },
        },
      };

export default roleResolvers;