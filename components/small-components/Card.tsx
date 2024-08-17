import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';

const Card = ({props}:any) => {

    const formatarData = (data:string) => {
        const newDate = new Date(Number(data))
        const dataFormatada = newDate.toLocaleDateString('pt-BR')
        return dataFormatada
    }

    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text>{props.descricao}</Text>
                </View>
            </View>
            <View style={styles.row}>
                
                <View style={styles.column}>
                    <Text>Quantidade:{` ${props.saldo}`}</Text>
                </View>
                <View style={styles.column}>
                    {props.tipoMov == "adicao" &&
                        <Text>Movimentação: Adição</Text>
                    }
                    {props.tipoMov == "remocao" &&
                        <Text>Movimentação: Remoção</Text>
                    }
                    
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text>Data: {` ${formatarData(props.dataMov)}`}</Text>
                </View>
                <View style={styles.column}>
                    <Text>Responsável: {` ${props.solicitante}`}</Text>
                </View>
            </View>
            {props.tipoMov == 'remocao' &&
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text>Motivo: {` ${props.motivo}`}</Text>
                    </View>
                </View>
            }
        </View>
    )
    
};

export default Card

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 15,
        marginBottom:10,
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid'
      },
    row:{
        display:'flex',
        justifyContent:'flex-start',
        paddingBottom:5
    },
    second_row:{
        display:'flex',
        justifyContent:'space-around'
    },
    column:{
        display:'flex',
        justifyContent:'center',
        marginLeft:20
    }
    
});