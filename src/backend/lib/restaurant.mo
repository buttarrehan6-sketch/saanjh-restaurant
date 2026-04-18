import Types "../types/restaurant";
import List "mo:core/List";

module {
  public func seedMenuItems(items : List.List<Types.MenuItem>) {
    let seed : [Types.MenuItem] = [
      // KARAHI
      { id = 1; name = "Karahi Gosht"; category = #karahi; description = "Tender mutton cooked in a wok with tomatoes, green chilies, and aromatic spices"; price = null; spiceLevel = ?"Medium" },
      { id = 2; name = "Chicken Karahi"; category = #karahi; description = "Juicy chicken pieces stir-fried with fresh tomatoes, ginger, and traditional spices"; price = null; spiceLevel = ?"Medium" },
      { id = 3; name = "Mutton Karahi"; category = #karahi; description = "Rich and flavorful mutton karahi slow-cooked to perfection with desi spices"; price = null; spiceLevel = ?"Hot" },
      // FISH
      { id = 4; name = "Fish Fry"; category = #fish; description = "Fresh fish marinated with spices and deep fried to crispy golden perfection"; price = null; spiceLevel = ?"Mild" },
      { id = 5; name = "Fish Karahi"; category = #fish; description = "Succulent fish cooked karahi-style with tomatoes, chilies, and fresh herbs"; price = null; spiceLevel = ?"Medium" },
      // BBQ
      { id = 6; name = "Seekh Kabab"; category = #bbq; description = "Minced beef skewers blended with herbs and spices, grilled over charcoal"; price = null; spiceLevel = ?"Medium" },
      { id = 7; name = "Boti"; category = #bbq; description = "Tender chunks of marinated meat grilled on skewers with smoky charcoal flavor"; price = null; spiceLevel = ?"Medium" },
      { id = 8; name = "Wings"; category = #bbq; description = "Crispy grilled chicken wings marinated in our signature spice blend"; price = null; spiceLevel = ?"Hot" },
      { id = 9; name = "Tikka"; category = #bbq; description = "Classic Pakistani chicken tikka marinated overnight and grilled to perfection"; price = null; spiceLevel = ?"Medium" },
      // NAAN & ROTI
      { id = 10; name = "Naan"; category = #naan_roti; description = "Soft, freshly baked leavened flatbread straight from the tandoor"; price = null; spiceLevel = null },
      { id = 11; name = "Tandoori Roti"; category = #naan_roti; description = "Whole wheat flatbread baked in a traditional clay tandoor oven"; price = null; spiceLevel = null },
      { id = 12; name = "Paratha"; category = #naan_roti; description = "Layered buttery flatbread pan-cooked to flaky golden brown"; price = null; spiceLevel = null },
      // DRINKS
      { id = 13; name = "Soft Drinks"; category = #drinks; description = "Chilled assorted carbonated beverages to complement your meal"; price = null; spiceLevel = null },
      { id = 14; name = "Lassi"; category = #drinks; description = "Traditional Pakistani yogurt drink, available sweet or salted"; price = null; spiceLevel = null },
      { id = 15; name = "Fresh Juice"; category = #drinks; description = "Freshly squeezed seasonal fruit juices served chilled"; price = null; spiceLevel = null },
    ];
    for (item in seed.vals()) {
      items.add(item);
    };
  };

  public func getRestaurantInfoData() : Types.RestaurantInfo {
    {
      name = "Saanjh Restaurant";
      tagline = "Authentic Pakistani Flavors";
      address = "E 11 New Air Port Road Near Gulshan Colony Morr, Bhatta Chowk, Cantt, Lahore, Pakistan";
      phone = "+92 308 4000364";
      hours = "Open 24 Hours";
      rating = 4.9;
      ratingCount = 10;
      services = ["Dine-in", "Takeout", "Delivery"];
    };
  };
};
