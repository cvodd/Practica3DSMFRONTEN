import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // Realiza una solicitud a tu API para obtener la lista de perfiles
    axios.get('http://10.0.2.2:8000/api/profile') // Ajusta la URL según tu configuración
      .then((response) => setProfiles(response.data))
      .catch((error) => console.error('Error fetching profiles:', error));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.profileItem} onPress={() => console.log('Ver detalles del perfil', item.id)}>
      <Text style={styles.profileName}>{item.name} {item.lastname}</Text>
    </TouchableOpacity>
  );

  return (
    
    <View style={styles.container}>
      <Text>Lista de perfiles</Text>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  profileItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;