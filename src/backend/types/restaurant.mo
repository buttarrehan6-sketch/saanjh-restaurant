module {
  public type Category = {
    #karahi;
    #fish;
    #bbq;
    #naan_roti;
    #drinks;
  };

  public type MenuItem = {
    id : Nat;
    name : Text;
    category : Category;
    description : Text;
    price : ?Text;
    spiceLevel : ?Text;
  };

  public type RestaurantInfo = {
    name : Text;
    tagline : Text;
    address : Text;
    phone : Text;
    hours : Text;
    rating : Float;
    ratingCount : Nat;
    services : [Text];
  };
};
