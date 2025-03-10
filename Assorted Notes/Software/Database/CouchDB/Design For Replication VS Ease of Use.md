# Design For Replication VS Ease of Use

CouchDB is a document-oriented NoSQL database that stores JSON documents. CouchDB Intro.md has more info.

## How CouchDB replicates data

Replication is the process of copying data from one database to another. To maintain data consistency, CouchDB uses a versioning system that tracks changes to documents. This allows CouchDB to detect conflicts and resolve them automatically. However, some conflicts require manual intervention, such as merging changes or resolving conflicts manually. Database design can lessen the impacts and likelihood of conflicts.

### Approch 1: Design for Ease of Use - (Traditional Document-Oriented Database)

- Documents are stored in a single collection/document
    - Pros: 
        - Easy to use
        - Data is already structured
        - Follow the document-oriented paradigm of de-normalizing data
    - Cons:
        - Documents that have conflicts are not automatically resolved
        - Conflicts require manual intervention
        - Data is not easily searchable

### Approach 2: Design for Replication - (Breaking down Data into many documents)

- Documents are stored in many collections/documents
    - Pros:
        - Data is easily searchable
        - Conflicts less likely to occur
    - Cons:
        - Data is not structured
        - Ease of use is reduced
        - Goes against the document-oriented paradigm

### Approach 3: Immutable history / event sourcing

### Approach 4: Keep historic versions explicitly

### Conclusion

The use case for CouchDB with my application is fairly simple and lightweight. Conflicts are less likely and for data like sensor data should only come from one source. The number of users is low. The main use case for the built in replication is to backup data in the event of a SD card failure.

Approach 3 and 4 are not necessary for my use case.

Approach 1 is the most straight forward and easy to use. I am also more familiar with it, having used MongoDB for a while.

Approach 2 is the most flexible and scalable.

I can use a mix of approaches depending on the specific data, probably just 1 and 2.

---

## Implementation

### Sensor Data

TO DOS/Questions:
- [ :white_check_mark: ] Do I separate the sensor readings data and sensor objects data into different databases?
    - Yes, I will separate them into different databases. Here is my reasoning: When the system controller needs to read sensor object data (to be able to locate and read from a sensor), it does not need to read the sensor readings data. Keeping a consistent sensor id across the two databases is essential for retrieving sensor data.
- [ ] Do I need to use views to query sensor data?
    - Yes, I will use views to query sensor data.

I am using approach 2 for sensor data for improved performance, query-ability, and scalability.

Example:
Database: SensorData
```json
documents: {
    {
        "_id": "sensor_${SENSOR_NAME}_${TIMESTAMP}",
        "type": "sensor_reading",
        "sensorId": "${SENSOR_NAME}",
        "timestamp": "${TIMESTAMP}",
        "value": 23.5
    },
    {
        "_id": "sensor_temp01_2025-03-10T14:30:22.000Z",
        "type": "sensor_reading",
        "sensorId": "temp01",
        "timestamp": "2025-03-10T14:30:22.000Z",
        "value": 23.5
    }
} 

"views": {
    "by_sensor_and_time": {
      "map": "function(doc) { if(doc.type === 'sensor_reading' && doc.sensorId && doc.timestamp) { emit([doc.sensorId, doc.timestamp], doc.value); } }"
    }
  }

  "indexes": {
    "by_sensor_and_time": {
      "index": {
        "fields": [
          "sensorId",
          "timestamp"
        ]
      }
    }
}
```

Example:
Database: SensorObjects
```json
documents: {
    {
        "_id": "sensor_temp01",
        "type": "sensor_object",
        "name": "temp01",
        "description": "Temperature sensor",
        "unit": "°C",
        "min": 0,
        "max": 100,
        "precision": 0.1
    },
    {
        "_id": "sensor_hum01",
        "type": "sensor_object",
        "name": "hum01",
        "description": "Humidity sensor",
        "unit": "%",
        "min": 0,
        "max": 100,
        "precision": 0.1
    }
}
```