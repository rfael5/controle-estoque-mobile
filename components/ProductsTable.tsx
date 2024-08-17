import React, { useState, useEffect } from 'react'; 
import { StyleSheet, Button, View, Text, FlatList, ScrollView } from 'react-native';
import AddProducts from './AddProducts';

const ProductsTable = () => {

  const [data, setData] = useState([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const getProducts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get-produtos')
      const json = await response.json();
      setData(json)
    }catch (error){
      console.error(error);
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const selectProduct = (product:any) => {
    setSelectedProduct(product)
  }

    return (
      <View>
        <ScrollView>
        <View>
          <FlatList
            data={data}
            keyExtractor={(item:any) => item.id}
            renderItem={({ item }) => (
              <View style={styles.rowContainer}>
                <Text style={styles.cell1}>{item.nomeProduto}</Text>
                <Text style={styles.cell2}>{item.saldoTotal}</Text>
                <View>
                  <Button
                    title="Alterar saldo"
                    onPress={() => selectProduct(item)}
                  />
                </View>
              </View>
            )}
          />
      </View>
       <AddProducts 
        produtoSelecionado={selectedProduct}
        atualizarLista={getProducts}>
       </AddProducts>  
        </ScrollView>
      </View>
    )
}


export default ProductsTable

const styles = StyleSheet.create({
    btnStyle:{ 
      borderWidth:0,
      backgroundColor:"#2196F3",
      color:'white',
      paddingTop:5,
      paddingBottom:5,
      height:30
    },
    tableContainer:{
      paddingEnd:50,
      paddingStart:0
    },
    rowContainer:{
      display:'flex',
      flexDirection:'row',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    cell1: {
      //flex: 1,
      width:130,
      justifyContent: 'center',
    },
    cell2:{
      width:70
    }

  });
