import { adminService } from "@/services/admin-services";

export async function getEmployessAdmin() {
  
     const data= await adminService.getAllUsers();
     console.log("data", data)
     
     return data
    
}