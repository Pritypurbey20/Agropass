import { logger, stream } from '../utils/logger';
import { msg } from '../server';
import Role from '../models/roleModel';
import Permission from '../models/permissionModel';
import User from '../models/userModel';

export default class DefaultData {
    async createDefaultRoles() {
        let rolesData = [{
            "name":"admin",
            "slug":"admin"
        },{
            "name":"user",
            "slug":"user"
        }];
        rolesData.forEach(async (role) => {
            let checkRoleExist = await Role.findOne({"name":role.name});
            if(!checkRoleExist){
                let newRole = await Role.create(role); 
                if(role.name === "admin"){
                    let checkUserExist = await User.findOne({"email":"test@infistack.com"});
                    if(!checkUserExist){
                        const newUser = await User.create({
                            firstName:"Test",
                            lastName: "Infi",
                            email: "test@infistack.com",
                            password: "test@111",
                            passwordConfirm: "test@111",
                            roleId:newRole._id
                          });
                    }
                    await Permission.create({
                        "name" : "user",
                        "resources_roles": [{
                            "roleId":newRole._id,
                            "roles_name":role.name,
                            "create": true,
                            "delete":true,
                            "update": true,
                            "read": true
                        }]
                     })
                }else{
                    let checkUserExist = await User.findOne({"email":"admin@infistack.com"})
                    if(!checkUserExist){
                        const newUser = await User.create({
                            firstName: "Admin",
                            lastName: "Infi",
                            email: "admin@infistack.com",
                            password: "admin@111",
                            passwordConfirm: "admin@111",
                            roleId:newRole._id
                          });
                    }
                    const doc = await Permission.findOneAndUpdate(
                        { "name": "user"},
                        { "$push": { "resources_roles": { "$each": [{
                            "roleId":newRole._id,
                            "roles_name":role.name,
                            "create":false,
                            "delete":false,
                            "update": true,
                            "read": true
                        }] } } }
                    )
                }
                
            }
        });
        //await this.send(msg.utils.emails.welcome, msg.utils.emails.welcomeFamily);
    }
}