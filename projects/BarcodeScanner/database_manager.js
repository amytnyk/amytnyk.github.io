let DatabaseManager = {
  init(onCountUpdated, onConfirmedUpdated, onLockStateUpdated) {
    this.onCountUpdated = onCountUpdated;
    this.onConfirmedUpdated = onConfirmedUpdated;
    this.onLockStateUpdated = onLockStateUpdated;

    const firebaseConfig = {
      apiKey: "AIzaSyDapTQS4wQZ1PLI4h-0mPc-Ewb3RWDzX24",
      authDomain: "inventorymaster9.firebaseapp.com",
      databaseURL: "https://inventorymaster9.firebaseio.com",
      projectId: "inventorymaster9",
      storageBucket: "inventorymaster9.appspot.com",
      messagingSenderId: "791776302265",
      appId: "1:791776302265:web:fd55884798e387fb"
    };
    firebase.initializeApp(firebaseConfig);

    firebase.database().ref().child('items').once('value').then(snapshot => {
      let data = snapshot.val();
      DatabaseManager.items = data;
    });

    firebase.database().ref().child('realtime').child('counts').on('value', snapshot => {
      let data = snapshot.val();
      if (data)
        DatabaseManager.realtimeData.counts = Utils.convertObjectToMap(data);
      else
        DatabaseManager.realtimeData.counts = new Map;
    });

    firebase.database().ref().child('locked').on('value', snapshot => {
      let data = snapshot.val();
      DatabaseManager.locked = data ? date : false;
      onLockStateUpdated();
    });
  },
  getItem(item) {
    let incomplete_item = undefined;
    if (item.barcode !== undefined) {
      DatabaseManager.items.forEach(value, key => {
        if (value.barcode == item.barcode)
          incomplete_item = { ...value, art: key };
      });
    } 
    else if (item.art !== undefined) {
      incomplete_item = DatabaseManager.items.get(item.art);
      if (incomplete_item)
        incomplete_item.art = item.art;
    }

    if (!incomplete_item)
      return incomplete_item;
    
    return {
      ...incomplete_item,
      art: incomplete_item.art,
      confirmed: DatabaseManager.realtimeData.confirmed.includes(incomplete_item.art),
      count: DatabaseManager.realtimeData.counts.get(incomplete_item.art) || 0,
    };
  },
  addCount(itemID, count) {
    item = getItem(itemID);
    firebase.database().ref().child('realtime').child('counts').transaction(counts => {
      if (counts) {
        counts[item.art] = item.count + count;
      }
      return counts;
    });
  },
  removeCount(itemID, count) {

  },
  removeItem(itemID) {

  },
};