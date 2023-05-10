import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const App = () => {
  const [etudiants, setEtudiants] = useState([]);
  const [nom, setNom] = useState('');
  const [bourse, setBourse] = useState('');
  const [selectedEtudiantId, setSelectedEtudiantId] = useState(null);

  useEffect(() => {
    fetchEtudiants();
  }, []);

  useEffect(() => {
    console.log("id",selectedEtudiantId)
    console.log("nom",nom)
    console.log("bourse",bourse)
  },[selectedEtudiantId])

  const fetchEtudiants = async () => {
    try {
      const response = await fetch('http://localhost:3000/router/etudiant');
      const data = await response.json();
      setEtudiants(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createEtudiant = async () => {
    try {
      if(nom === '' && bourse === ''){
        console.log("vide")

      }else{
        await fetch('http://localhost:3000/router/etudiant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nom, bourse }),
      });
      setNom('');
      setBourse('');
      fetchEtudiants();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEtudiant = async (id) => {
    try {
      
      const response = await fetch(`http://localhost:3000/router/etudiant/${id}`);
      const data = await response.json();
      console.log("data ray",data)
      setSelectedEtudiantId(data.id);
      setNom(data.nom)
      setBourse(data.bourse);
      
      
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const updateEtudiant = async () => {
    
      try {
        await fetch(`http://localhost:3000/router/etudiant/${selectedEtudiantId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nom, bourse }),
        });
        setNom('');
        setBourse('');
        setSelectedEtudiantId(null);
        fetchEtudiants();
      } catch (error) {
        console.error(error);
      }
   
     
  
  }

  const deleteEtudiant = async (id) => {
    try {
      await fetch(`http://localhost:3000/router/etudiant/${id}`, {
        method: 'DELETE',
      });
      fetchEtudiants();
    } catch (error) {
      console.error(error);
    }
  };

  const annulerAction = async () => {
    setNom('');
        setBourse('');
        setSelectedEtudiantId(null);

  }
  ///min,max,total bourse 

  const totalBourse = etudiants.reduce((acc, curr) => acc + curr.bourse, 0);
  const minBourse = Math.min(...etudiants.map((etudiant) => etudiant.bourse));
  const maxBourse = Math.max(...etudiants.map((etudiant) => etudiant.bourse));

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={nom}
          onChangeText={setNom}
        />
        <TextInput
          style={styles.input}
          placeholder="Bourse"
          value={bourse}
          onChangeText={setBourse}
          keyboardType="numeric"
        />
        <View style={styles.buttonContainer}>
          { selectedEtudiantId === null ?
          <Button title="Ajouter" onPress={createEtudiant} /> :
          <Button title="Modifier" onPress={updateEtudiant} />
          }
          <Button title="Annuler" onPress={annulerAction} />
        </View>
      </View>
      <FlatList
        data={etudiants}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Nom</Text>
            <Text style={styles.headerText}>Bourse</Text>
            <Text style={styles.headerText}>Action</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.nom}</Text>
            <Text style={styles.itemText}>{item.bourse}</Text>
            <View style={styles.buttonContainer}>
              
              <Button title="Modifier" onPress={() => fetchEtudiant(item.id)} />
              <Button title="Supprimer" onPress={() => deleteEtudiant(item.id)} />
            
            </View>
            {/* calcul bourse */}
            
          </View>
        )}
      />
      <View style={styles.summaryContainer}>
              <Text style={styles.summaryText}>Bourse totale: {totalBourse}</Text>
              <Text style={styles.summaryText}>Bourse minimale: {minBourse}</Text>
              <Text style={styles.summaryText}>Bourse maximale: {maxBourse}</Text>
            </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    flex: 1,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 2
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;