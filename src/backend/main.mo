import Types "types/restaurant";
import RestaurantLib "lib/restaurant";
import RestaurantMixin "mixins/restaurant-api";
import List "mo:core/List";

actor {
  let menuItems = List.empty<Types.MenuItem>();

  RestaurantLib.seedMenuItems(menuItems);

  include RestaurantMixin(menuItems);
};
