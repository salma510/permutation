import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, FlatList } from 'react-native';

const Combinaison = () => {
  const [professors, setProfessors] = useState([]);
  const [combinations, setCombinations] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    try {
      const response = await fetch('https://troubled-red-garb.cyclic.app/professeurs');
      const data = await response.json();
      setProfessors(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCombination = () => {
    const groupedProfessors = groupProfessorsBySpeciality();
    const combinationsData = [];

    groupedProfessors.forEach((group) => {
      const { speciality, professors } = group;
      const possibleCombinations = [];

      for (let i = 0; i < professors.length; i++) {
        for (let j = i + 1; j < professors.length; j++) {
          possibleCombinations.push({
            professor1: professors[i],
            professor2: professors[j],
          });
        }
      }

      combinationsData.push({
        speciality,
        combinations: possibleCombinations,
      });
    });

    setCombinations(combinationsData);
  };

  const groupProfessorsBySpeciality = () => {
    const groupedProfessors = {};

    professors.forEach((professor) => {
      const { speciality } = professor;

      if (!groupedProfessors[speciality]) {
        groupedProfessors[speciality] = [];
      }

      groupedProfessors[speciality].push(professor);
    });

    const groupedProfessorsArray = Object.keys(groupedProfessors).map((speciality) => ({
      speciality,
      professors: groupedProfessors[speciality],
    }));

    return groupedProfessorsArray;
  };

  const renderCombination = ({ item }) => {
    const { speciality, combinations } = item;

    return (
      <View style={styles.card}>
        <Text style={styles.speciality}>{`Spécialité: ${speciality}`}</Text>
        <Text style={styles.combinationLabel}>Combinations Possibles :</Text>
        {combinations && combinations.length > 0 ? (
          <FlatList
            data={combinations}
            renderItem={renderCombinationItem}
            keyExtractor={(item, index) => `${speciality}-${index}`}
            style={styles.combinationsList}
          />
        ) : (
          <Text style={styles.noCombinationsText}>Aucune combinaison trouvée.</Text>
        )}
      </View>
    );
  };

  const renderCombinationItem = ({ item }) => {
    const { professor1, professor2 } = item;
    const { prenom: prenom1, nom: nom1, villeFaculteActuelle: villeFaculteActuelle1, villeDesiree: villeDesiree1 } = professor1;
    const { prenom: prenom2, nom: nom2, villeFaculteActuelle: villeFaculteActuelle2, villeDesiree: villeDesiree2 } = professor2;

    return (
      <View style={styles.combinationItem}>
        <Text>{`${prenom1} ${nom1} (${villeFaculteActuelle1} - ${villeDesiree1})`}</Text>
        <Text>{`${prenom2} ${nom2} (${villeFaculteActuelle2} - ${villeDesiree2})`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Trouver les combinaisons" onPress={handleCombination} />

      {combinations && combinations.length > 0 ? (
        <FlatList
          data={combinations}
          renderItem={renderCombination}
          keyExtractor={(item) => item.speciality}
          style={styles.combinationsList}
        />
      ) : (
        <Text style={styles.noCombinationsText}>Aucune combinaison trouvée.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
  },
  speciality: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  combinationLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  combinationsList: {
    marginLeft: 8,
  },
  noCombinationsText: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  combinationItem: {
    marginBottom: 4,
  },
});

export default Combinaison;