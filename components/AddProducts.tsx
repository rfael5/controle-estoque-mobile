
import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Text, View, Button, KeyboardAvoidingView } from 'react-native';

const AddProducts = ({produtoSelecionado, atualizarLista}:any) => {

  const [error, setError] = useState(false)
  const [formData, setFormData] = useState({
    descricao: '',
    saldo: '',
    solicitante: '',
    motivo: ''
  })

  const atualizarSaldo = async (mov:number) => {
    try {
      await fetch('http://127.0.0.1:5000/atualizar-saldo', {
        method:'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id:produtoSelecionado.id,
          nome:produtoSelecionado.nomeProduto,
          movimentacao:mov
        })
      })
      atualizarLista()
    } catch (e){
      console.error(e)
    }
  }

  function todayInMilliseconds(){
    const today = new Date()
    const ms = Date.parse(today.toString())
    const ms_string = ms.toString()
    return ms_string    
  }

  const moveProducts = (produto: any, _tipoMov: string) => {
    try {
      fetch('http://127.0.0.1:5000/alterar-estoque', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idProduto: produtoSelecionado.id,
          descricao: produtoSelecionado.nomeProduto,
          saldo: _tipoMov == "adicao" ? produto.saldo : produto.saldo * -1,
          unidade: 'UN',
          dataMov: todayInMilliseconds(),
          tipoMov: _tipoMov,
          solicitante: produto.solicitante,
          motivo: produto.motivo
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  const handleChange = (name:string, value:string) => {
    setFormData({
      ...formData,
      [name]:value
    })
  }

  function isNullOrEmpty(data:any){
    if(data === null || data === ''){
      return true
    }else{
      return false
    }
  }

  function resetarFormulario(){
    setFormData({
      descricao:'',
      saldo:'',
      solicitante:'',
      motivo:''
    })
  }

  const handleSubmit = async (e: any, tipoMov: string) => {
    e.preventDefault()
    if(isNullOrEmpty(formData.motivo) || isNullOrEmpty(formData.solicitante)){
      setError(true)
    }else{
      moveProducts(formData, tipoMov)
      if(tipoMov == 'adicao'){
        let _saldo = Number(formData.saldo)
        atualizarSaldo(_saldo)
      }else{
        let _saldo = Number(formData.saldo) * -1
        atualizarSaldo(_saldo)
      }
      setError(false)
    }
    resetarFormulario()
  }

  if (produtoSelecionado) {
    return (
      <KeyboardAvoidingView style={styles.container}>

        <View> 
          <Text style={{fontSize:18, marginBottom:10}}>{produtoSelecionado.nomeProduto}</Text>
        </View>
       
          <Text>Saldo: </Text>
          <TextInput style={styles.input} onChangeText={text => handleChange('saldo', text)} value={formData.saldo}></TextInput>
        
          <Text>Responsável: </Text>
          <TextInput style={styles.input} onChangeText={text => handleChange('solicitante', text)} value={formData.solicitante}></TextInput>

          <Text >Motivo: </Text>
          <TextInput style={styles.input} onChangeText={text => handleChange('motivo', text)} value={formData.motivo}></TextInput>
          
          <View style={styles.btnContainer}>
            <Button onPress={(e) => handleSubmit(e, 'adicao')} title="Adicionar"></Button>
            <Button onPress={(e) => handleSubmit(e, 'remocao')} title="Remover"></Button>
          </View>

          <View>
            <Button title="Atualizar saldo" onPress={() => atualizarLista()} />
          </View>
          {
            error &&
            <View>
              <Text style={{color:"red"}}>Os campos "motivo" e "solicitante" são obrigatórios</Text>
            </View>
          }
                  
    </KeyboardAvoidingView>
    )

  }

  else {return (<View></View>)}

}

export default AddProducts

const styles = StyleSheet.create({
  container:{
    marginTop: 35,
    borderColor:"black",
    paddingEnd:50
  },
  input:{
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    height:30,
    marginBottom:10,
  },
  btnContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:15
  },
  btnStyle:{
    marginRight:15,
    height:40
  }
});
