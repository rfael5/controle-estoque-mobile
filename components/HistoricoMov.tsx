import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Button, TextInput } from 'react-native';
import Card from './small-components/Card';

const HistoricoMov = () => {
    const [historico, setHistorico] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 10;

    const buscarHistoricoPeriodo = async (data_inicio:string, data_fim:string) => {
        try {
            const res = await fetch(`http://127.0.0.1:5000/historico-periodo?data_inicio=${data_inicio}&data_fim=${data_fim}`);
            const json = await res.json();
            setHistorico(json)
        }catch(e){
            console.error(e)
        }
    }

    const handleSubmit = (e:any) => {
        e.preventDefault()
        buscarHistoricoPeriodo(formData.data_inicio, formData.data_fim)
    }

    //Primeiro elemento que aparecerá na página. 
    //Se a página atual for 1, ele fará a seguinte operação: (1 - 1) * 10 -> 0 * 10 = 0
    //Nesse caso, a lista começará do elemento no index 0.
    //Se a página atual for 2, ele fará a seguinte operação: (2 - 1) * 10 -> 1 * 10 = 10
    //Nesse caso, a lista começará do elemento de index 10, e assim sucessivamente caso o 
    //número de elementos a serem mostrados na interface for 10 
    const startIndex = (paginaAtual - 1) * itensPorPagina;
    const endIndex = startIndex + itensPorPagina;
    //paginacaoHistorico recebe todos os itens em histórico do index inicial ao index final
    const paginacaoHistorico = historico.slice(startIndex, endIndex);

    const totalPaginas = Math.ceil(historico.length / itensPorPagina);

    const handleNextPage = () => {
        if (paginaAtual < totalPaginas) {
            setPaginaAtual(paginaAtual + 1);
        }
    };

    const handlePreviousPage = () => {
        if (paginaAtual > 1) {
            setPaginaAtual(paginaAtual - 1);
        }
    };

    const [formData, setFormData] = useState({
        data_inicio:"",
        data_fim:""
    })


    const handleChange = (name: string, value: string) => {
        const splitted = value.split("-");
    
        const formattedString = `${splitted[2]}-${splitted[1]}-${splitted[0]}`;
    
        const newDate = new Date(formattedString);
    
        setFormData({
            ...formData,
            [name]: Date.parse(newDate.toString())
        });
    };


    return (
        <View style={styles.wrapper}>
            <View style={styles.formContainer}>

                <Text>De: </Text>
                <TextInput 
                    style={styles.inputDate} 
                    onChangeText={(value:string) => handleChange('data_inicio', value)}
                    placeholder="dd-mm-aaaa"
                />
                <Text>Até</Text>
                <TextInput 
                    style={styles.inputDate} 
                    onChangeText={(value) => handleChange('data_fim', value)}
                    placeholder="dd-mm-aaaa"
                />
                
                <Button title="Ver Histórico" onPress={handleSubmit} />
                
            </View>
             <View style={styles.tableContainer}>
                <ScrollView style={styles.contentContainer}>
                    {paginacaoHistorico.map((mov: any) => (
                        <Card key={mov.id} props={mov} />
                    ))}
                </ScrollView>
                <View style={styles.paginationContainer}>
                    <Button 
                        title="Anterior" 
                        onPress={handlePreviousPage} 
                        disabled={paginaAtual === 1} 
                    />
                    <Text>
                        Pagina {paginaAtual} de {totalPaginas}
                    </Text>
                    <Button 
                        title="Próximo" 
                        onPress={handleNextPage} 
                        disabled={paginaAtual === totalPaginas} 
                    />
                </View>
            </View>
        </View>
    );
};

export default HistoricoMov;

const styles = StyleSheet.create({
    wrapper:{
        backgroundColor:'white',
        paddingTop:25
    },
    tableContainer: {
        height:500

    },
    formContainer: {
        display:'flex',
        flexDirection:'column',
        padding:10
    },
    inputDate: {
        marginTop:6,
        marginBottom:10,
        height:40
    },
    contentContainer: {
        padding:10
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom:70,
        marginBottom:7,
        marginTop:7
    },
    container: { 
        padding: 0,
        borderBlockColor: 'black'
    },
    modalBox:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:22
    },
    modalContent:{
        margin:20,
        backgroundColor:'white',
        borderRadius:20,
        width:'90%',
        padding:35,
        alignItems:'center',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius:4,
        elevation:5
    }
});