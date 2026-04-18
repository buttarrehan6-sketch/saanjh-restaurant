import Types "../types/restaurant";
import RestaurantLib "../lib/restaurant";
import List "mo:core/List";

mixin (menuItems : List.List<Types.MenuItem>) {
  public query func getMenuItems() : async [Types.MenuItem] {
    menuItems.toArray();
  };

  public query func getRestaurantInfo() : async Types.RestaurantInfo {
    RestaurantLib.getRestaurantInfoData();
  };
};
