// RewardsPage.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import BottomBar from './BottomBar'; 

const RewardsPage = () => {
  const rewards = [
    {
      id: 1,
      points: 200,
      brand: 'Amazon',
      title: '$5 gift voucher',
      image: require('./amazon.jpg') 
    },
    {
      id: 2,
      points: 200,
      brand: 'Nike',
      title: '$10 gift voucher',
      image: require('./nike.jpg') 
    },
    // Add more rewards as needed
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>My Rewards</Text>
        
        {/* Points Balance */}
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsBalance}>Your Points: 400</Text>
        </View>

        {/* Rewards List */}
        <ScrollView contentContainerStyle={styles.rewardsContainer}>
          {rewards.map((reward) => (
            <View key={reward.id} style={styles.rewardCard}>
              <View style={styles.rewardHeader}>
                <Text style={styles.points}>{reward.points} Points</Text>
              </View>
              <View style={styles.rewardContent}>
                <Image source={reward.image} style={styles.brandImage} />
                <Text style={styles.brandName}>{reward.brand}</Text>
                <Text style={styles.rewardTitle}>{reward.title}</Text>
                <TouchableOpacity style={styles.redeemButton}>
                  <Text style={styles.redeemButtonText}>Redeem Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Bottom Navigation (Keep your BottomBar code as is) */}
      <BottomBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 80, // Space for bottom bar
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#14898D',
  },
  pointsContainer: {
    backgroundColor: '#f0f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  pointsBalance: {
    fontSize: 18,
    fontWeight: '600',
    color: '#14898D',
  },
  rewardsContainer: {
    paddingBottom: 20,
  },
  rewardCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  rewardHeader: {
    backgroundColor: '#14898D',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 12,
  },
  points: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  rewardContent: {
    padding: 20,
    alignItems: 'center',
  },
  brandImage: {
    width: 120, 
    height: 80, 
    resizeMode: 'contain', 
    marginBottom: 15,
  },
  brandName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  rewardTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  redeemButton: {
    backgroundColor: '#14898D',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  redeemButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RewardsPage;
