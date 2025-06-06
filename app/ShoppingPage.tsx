import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, StyleSheet, FlatList, Dimensions, ImageBackground, Modal, Pressable } from 'react-native';
import BottomBar from './BottomBar';
import { useNavigation } from '@react-navigation/native'; 
import Filter from '/Filter';
import { Linking } from 'react-native';

const { width } = Dimensions.get('window');

const banners = [
  require('./images/banner1.png'),
  require('./images/banner2.png'),
];

const categories = [
  { name: 'Stationery', image: require('./images/stationery.png'), color: '#FBE5D6' },
  { name: 'Electronics', image: require('./images/electronics.png'), color: '#E2F0CB' },
  { name: 'Fashion', image: require('./images/fashion.png'), color: '#D9E1F2' },
  { name: 'Accessories', image: require('./images/accessories.png'), color: '#F8CBAD' },
];

const recommendedItems = [
  { name: 'Backpack', price: '$29.99', rating: 4.5, image: require('./images/backpack.jpg') },
  { name: 'Muji Pens', price: '$5.99', rating: 4.8, image: require('./images/pens.jpg') },
  { name: 'Books', price: '$15.00', rating: 4.2, image: require('./images/books.jpg') },
  { name: 'PS5', price: '$499.99', rating: 4.9, image: require('./images/ps5.jpg') },
];

const teddyBearItems = [
  { name: 'Teddy Bear 1', price: '$25.00', rating: 4.7, image: require('./images/teddy1.jpg') },
  { name: 'Teddy Bear 2', price: '$30.00', rating: 4.6, image: require('./images/teddy2.jpg') },
  { name: 'Teddy Bear 3', price: '$22.50', rating: 4.8, image: require('./images/teddy3.jpg') },
  { name: 'Teddy Bear 4', price: '$27.00', rating: 4.9, image: require('./images/teddy4.jpg') },
  { name: 'Teddy Bear 5', price: '$35.00', rating: 4.5, image: require('./images/teddy5.jpg') },
  { name: 'Teddy Bear 6', price: '$40.00', rating: 4.9, image: require('./images/teddy6.jpg') },
  { name: 'Teddy Bear 7', price: '$105.30', rating: 4.5, image: require('./images/teddy7.jpg') },
  { name: 'Teddy Bear 8', price: '$36.07', rating: 4.9, image: require('./images/teddy8.jpg') },
];

const categoryItemsMap: { [key: string]: any[] } = {
  Stationery: [
    { name: 'Muji Pens', price: '$5.99', rating: 4.8, image: require('./images/pens.jpg') },
    { name: 'Books', price: '$15.00', rating: 4.2, image: require('./images/books.jpg') },
  ],
  Electronics: [
    { name: 'PS5', price: '$499.99', rating: 4.9, image: require('./images/ps5.jpg') },
  ],
  Fashion: [
    { name: 'Backpack', price: '$29.99', rating: 4.5, image: require('./images/backpack.jpg') },
  ],
  Accessories: teddyBearItems,
};

export default function Search() {
  const navigation = useNavigation(); 
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null); // New state for product detail

  const handleSearch = (text: string) => {
    setSearchQuery(text.toLowerCase());
    setSelectedCategory(null);
  };

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
  };

  const handleProductPress = (product: any) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const renderProduct = (item: any) => (
    <TouchableOpacity style={styles.productItem} onPress={() => handleProductPress(item)}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <Text style={styles.productRating}>⭐ {item.rating}</Text>
    </TouchableOpacity>
  );

  const renderProductList = (title: string, data: any[]) => (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.name}
        numColumns={2}
        renderItem={({ item }) => renderProduct(item)}
        contentContainerStyle={styles.recommendedContainer}
      />
    </View>
  );

  const renderContent = () => {
    if (searchQuery.includes('teddy')) {
      return renderProductList('Search Results for "Teddy Bear"', teddyBearItems);
    } else if (selectedCategory) {
      return renderProductList(`Category: ${selectedCategory}`, categoryItemsMap[selectedCategory] || []);
    } else {
      return (
        <>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.categoryContainer, { backgroundColor: category.color }]}
                onPress={() => handleCategoryPress(category.name)}
              >
                <Image source={category.image} style={styles.categoryImage} />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Recommended</Text>
          <FlatList
            data={recommendedItems}
            keyExtractor={(item) => item.name}
            numColumns={2}
            renderItem={({ item }) => renderProduct(item)}
            contentContainerStyle={styles.recommendedContainer}
          />
        </>
      );
    }
  };

  return (
    <ImageBackground source={require('./BackgroundCover.jpg')} style={styles.background}>
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Swipable Banner */}
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.bannerContainer}>
            {banners.map((banner, index) => (
              <Image key={index} source={banner} style={styles.banner} />
            ))}
          </ScrollView>

          {/* Search Bar */}
          <View style={styles.searchFilterRow}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search items..."
              onChangeText={handleSearch}
              value={searchQuery}
            />
            <TouchableOpacity style={styles.filterIconContainer} onPress={() => navigation.navigate('Filter')}>
              <Image
                source={require('./images/filter.png')} // Replace with your filter icon
                style={styles.filterIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          {renderContent()}
        </ScrollView>

        {/* Fixed Bottom Bar */}
        <BottomBar />

        {/* Product Detail Modal */}
        {selectedProduct && (
          <Modal
            visible={true}
            transparent
            animationType="slide"
            onRequestClose={closeProductModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Image source={selectedProduct.image} style={styles.modalImage} />
                <Text style={styles.modalName}>{selectedProduct.name}</Text>
                <Text style={styles.modalPrice}>{selectedProduct.price}</Text>
                <Text style={styles.modalRating}>⭐ {selectedProduct.rating}</Text>

                {/* Add to Wishlist */}
                <Pressable onPress={() => {/* Add to wishlist logic */}} style={styles.wishlistButton}>
                  <Text style={styles.wishlistButtonText}>Add to Wishlist</Text>
                </Pressable>

                {/* Buttons: Go to Store + Close */}
                <View style={styles.modalButtonRow}>
                  <Pressable
                    onPress={() => {
                      let url = 'https://default-store-link.com';

                      if (selectedProduct.name === 'Teddy Bear 7') {
                        url = 'https://www.amazon.sg/JOON-Huge-Teddy-Bear-Tan/dp/B008AZB00G';
                      } else if (selectedProduct.name === 'Teddy Bear 8') {
                        url = 'https://www.amazon.sg/GUND-Teddy-Plush-Stuffed-Animal/dp/B083FMGN27?th=1';
                      }

                      Linking.openURL(url);
                    }}
                    style={styles.storeButton}
                  >
                    <Text style={styles.storeButtonText}>Go to Store</Text>
                  </Pressable>
                  
                  <Pressable onPress={closeProductModal} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  bannerContainer: {
    width: '100%',
    height: 180,
  },
  banner: {
    width,
    height: 180,
    resizeMode: 'cover',
  },
  searchInput: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  horizontalScroll: {
    paddingHorizontal: 16,
  },
  categoryContainer: {
    alignItems: 'center',
    marginRight: 16,
    borderRadius: 12,
    padding: 10,
  },
  categoryImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  searchFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 10,
  },
  searchInput: {
    flex: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginRight: 8,
  },
  filterIconContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    width: 24,
    height: 24,
  },
  recommendedContainer: {
    paddingHorizontal: 16,
  },
  productItem: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 13,
    color: '#888',
  },
  productRating: {
    fontSize: 12,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  modalName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalPrice: {
    fontSize: 16,
    marginVertical: 5,
  },
  modalRating: {
    fontSize: 14,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#FF6347',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  wishlistButton: {
    marginTop: 10,
    backgroundColor: '#ff69b4',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  wishlistButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    width: '100%',
  },
  
  storeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  
  storeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
