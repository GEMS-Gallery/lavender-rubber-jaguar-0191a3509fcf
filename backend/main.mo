import Array "mo:base/Array";
import Hash "mo:base/Hash";

import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Option "mo:base/Option";

actor {
  // Define the TaxPayer type
  public type TaxPayer = {
    tid: Text;
    firstName: Text;
    lastName: Text;
    address: Text;
  };

  // Create a stable variable to store TaxPayer records
  private stable var taxPayersEntries : [(Text, TaxPayer)] = [];

  // Create a HashMap to store TaxPayer records
  private var taxPayers = HashMap.HashMap<Text, TaxPayer>(0, Text.equal, Text.hash);

  // Initialize the HashMap with stable data
  private func initHashMap() {
    for ((k, v) in taxPayersEntries.vals()) {
      taxPayers.put(k, v);
    };
  };

  // Call initHashMap when the canister is created
  initHashMap();

  // Add a new TaxPayer record
  public func addTaxPayer(taxpayer: TaxPayer) : async Result.Result<(), Text> {
    switch (taxPayers.get(taxpayer.tid)) {
      case null {
        taxPayers.put(taxpayer.tid, taxpayer);
        #ok(())
      };
      case (?_) {
        #err("TaxPayer with TID " # taxpayer.tid # " already exists")
      };
    }
  };

  // Get all TaxPayer records
  public query func getTaxPayers() : async [TaxPayer] {
    Iter.toArray(taxPayers.vals())
  };

  // Get a TaxPayer record by TID
  public query func getTaxPayerByTID(tid: Text) : async ?TaxPayer {
    taxPayers.get(tid)
  };

  // Update an existing TaxPayer record
  public func updateTaxPayer(taxpayer: TaxPayer) : async Result.Result<(), Text> {
    switch (taxPayers.get(taxpayer.tid)) {
      case null {
        #err("TaxPayer with TID " # taxpayer.tid # " not found")
      };
      case (?_) {
        taxPayers.put(taxpayer.tid, taxpayer);
        #ok(())
      };
    }
  };

  // Delete a TaxPayer record
  public func deleteTaxPayer(tid: Text) : async Result.Result<(), Text> {
    switch (taxPayers.remove(tid)) {
      case null {
        #err("TaxPayer with TID " # tid # " not found")
      };
      case (?_) {
        #ok(())
      };
    }
  };

  // System functions for upgrades
  system func preupgrade() {
    taxPayersEntries := Iter.toArray(taxPayers.entries());
  };

  system func postupgrade() {
    taxPayersEntries := [];
  };
}
