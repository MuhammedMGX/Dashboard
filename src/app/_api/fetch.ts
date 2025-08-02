import axios from "axios";
import { ChartsInfo, dataInfo, UserInfo } from "../_interface/dataInfo";
import { log } from "console";




export async function getProducts(): Promise<dataInfo[]> {
    try {
    const Products = await axios.get('https://dummyjson.com/products');

    return Products.data.products;
    } catch (error) {
        console.error('Error fetching Products:', error);
        throw error;
    } 
  }


  export async function getOneProduct(id: number) {
    try {
    const Products = await axios.get(`https://dummyjson.com/products/${id}`);

    return Products.data;
    } catch (error) {
        console.error('Error fetching Products:', error);
        throw error;
    } 
  }


  
export async function deleteProducts(id: number): Promise<dataInfo> {
    try {
    const Products = await axios.delete(`https://dummyjson.com/products/${id}`);

    return Products.data;
    } catch (error) {
        console.error('Error fetching Products:', error);
        throw error;
    } 
  }



export async function updateProducts(
  id: number,
  title: string,
  category: string,
  price: number
): Promise<any> {
  try {
    const response = await axios.put(`https://dummyjson.com/products/${id}`, {
      title,
      category,
      price,
    });

    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}









export async function getUsers(): Promise<UserInfo[]> {
    try {
    const Users = await axios.get('https://dummyjson.com/users');

    return Users.data.users;
    } catch (error) {
        console.error('Error fetching Users:', error);
        throw error;
    } 
  }



  export async function getOneUsers(id:number): Promise<UserInfo[]> {
    try {
    const Users = await axios.get(`https://dummyjson.com/users/${id}`);

    console.log(Users.data);
    return Users.data;
    } catch (error) {
        console.error('Error fetching Users:', error);
        throw error;
    } 
  }










  export async function getUsersCharts(): Promise<ChartsInfo[]> {
    try {
    const Carts = await axios.get('https://dummyjson.com/carts');

    return Carts.data.carts;
    } catch (error) {
        console.error('Error fetching Users:', error);
        throw error;
    } 
  }



  export async function getOneChart(id:number): Promise<UserInfo> {
    try {
    const Users = await axios.get(`https://dummyjson.com/carts/${id}`);

    console.log(Users.data);
    return Users.data;
    } catch (error) {
        console.error('Error fetching Users:', error);
        throw error;
    } 
  }