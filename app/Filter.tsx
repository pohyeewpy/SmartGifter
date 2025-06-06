import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Filter = () => {
  const navigation = useNavigation();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const isActive = (filter: string) => selectedFilters.includes(filter);

  const resetFilters = () => setSelectedFilters([]);

  const renderSection = (title: string, options: string[]) => (
    <>
      <Text style={{ fontWeight: 'bold', marginTop: 12 }}>{title}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 8 }}>
        {options.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.optionButton,
              isActive(item) && styles.activeOptionButton,
            ]}
            onPress={() => toggleFilter(item)}
          >
            <Text style={isActive(item) ? styles.activeOptionText : null}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {renderSection('OCCASIONS', ['Birthday', 'Anniversary', 'Engagement'])}
      {renderSection('RECIPIENTS', ['Wife', 'Husband', 'Girlfriend'])}
      {renderSection('SORT BY', ['Most Recent', 'Popular', 'Price High'])}
      {renderSection('PRICING RANGE', ['100-499', '500-1499', '1500<'])}
      {renderSection('REVIEWS', ['4.5 & Above', '3 - 4', '2 - 3', '1 - 2', '1'])}

      {/* Buttons */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
        <TouchableOpacity
          style={{ padding: 12, backgroundColor: '#00bfa5', borderRadius: 10 }}
          onPress={resetFilters}
        >
          <Text style={{ color: 'white' }}>RESET</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 12, backgroundColor: '#ffc107', borderRadius: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: 'white' }}>APPLY</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = {
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
    margin: 4,
    width: 120,
    alignItems: 'center',
  },
  activeOptionButton: {
    backgroundColor: '#FF6347',
  },
  activeOptionText: {
    color: '#fff',
    fontWeight: '600',
  },
};

export default Filter;
