import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Int "mo:core/Int";
import Text "mo:core/Text";

actor {
  type Message = {
    text : Text;
    timestamp : Time.Time;
    sender : Sender;
  };

  type Sender = {
    #user;
    #assistant;
  };

  module Sender {
    public func compare(s1 : Sender, s2 : Sender) : Order.Order {
      switch (s1, s2) {
        case (#user, #assistant) { #less };
        case (#assistant, #user) { #greater };
        case (_) { #equal };
      };
    };
  };

  module Message {
    public func compare(m1 : Message, m2 : Message) : Order.Order {
      switch (Int.compare(m1.timestamp, m2.timestamp)) {
        case (#equal) {
          Sender.compare(m1.sender, m2.sender);
        };
        case (order) { order };
      };
    };
  };

  let messages = Map.empty<Time.Time, Message>();

  public shared ({ caller }) func send(text : Text, sender : Sender) : async Time.Time {
    sendLocal(text, sender);
  };

  func sendLocal(text : Text, sender : Sender) : Time.Time {
    if (text.trimStart(#char ' ').trimEnd(#char ' ').size() == 0) {
      Runtime.trap("Message is empty");
    };

    let timestamp = Time.now();
    let message = {
      text;
      timestamp;
      sender;
    };
    messages.add(timestamp, message);

    timestamp;
  };

  public query ({ caller }) func getAll() : async [Message] {
    messages.values().toArray().sort();
  };

  public query ({ caller }) func getRange(from : ?Time.Time, to : ?Time.Time) : async [Message] {
    messages.values().toArray().filter(
      func(m) {
        let fromCheck = switch (from) {
          case (null) { true };
          case (?fromValue) { m.timestamp >= fromValue };
        };

        let toCheck = switch (to) {
          case (null) { true };
          case (?toValue) { m.timestamp <= toValue };
        };

        fromCheck and toCheck;
      }
    );
  };
};
