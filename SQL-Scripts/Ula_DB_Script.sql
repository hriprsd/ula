CREATE TABLE user_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_type VARCHAR(25) NOT NULL
);

INSERT INTO user_type (user_type) VALUES ('pilot'), ('passenger');

CREATE TABLE vehicle_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_type VARCHAR(25) NOT NULL
);

INSERT INTO vehicle_type (vehicle_type) VALUES ('2-wheeler'), ('4-wheeler');

CREATE TABLE user_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_nt_id VARCHAR(25) NOT NULL,
    mobile_number INT NOT NULL,
    location VARCHAR(75) NOT NULL,
    user_type_id INT NOT NULL,
    FOREIGN KEY (user_type_id) REFERENCES user_type (id)
);

ALTER TABLE user_details MODIFY mobile_number VARCHAR(10);
ALTER TABLE user_details ADD COLUMN user_name VARCHAR(75) AFTER id;
ALTER TABLE user_details ADD COLUMN trip_route TEXT;
ALTER TABLE user_details ADD INDEX user_nt_id_idx (user_nt_id);

CREATE TABLE user_credentials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    passphrase VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES user_details (id)
);

CREATE TABLE vehicle_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_number VARCHAR(25) NOT NULL,
    vehicle_type_id INT NOT NULL,
    model VARCHAR(50),
    color VARCHAR(50),
    make VARCHAR(50),
    number_of_seats INT NOT NULL,
    vehicle_owner INT NOT NULL,
    FOREIGN KEY (vehicle_type_id) REFERENCES vehicle_type (id),
    FOREIGN KEY (vehicle_owner) REFERENCES user_details (id)
);

CREATE TABLE vehicle_trips (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pilot_id INT,
    vehicle_id INT,
    trip_start_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    trip_start_location VARCHAR(75) NOT NULL,
    trip_end_date_time DATETIME,
    trip_end_location VARCHAR(75),
    trip_route TEXT,
    FOREIGN KEY (pilot_id) REFERENCES user_details (id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicle_details (id)   
);

ALTER TABLE vehicle_trips DROP COLUMN trip_route;
ALTER TABLE vehicle_trips ADD COLUMN trip_type TINYINT(1);
ALTER TABLE vehicle_trips MODIFY COLUMN trip_type INT;

ALTER TABLE vehicle_trips ADD COLUMN trip_status VARCHAR(50);

CREATE TABLE current_available_vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT,
    available_seats INT NOT NULL,
    FOREIGN KEY (trip_id) REFERENCES vehicle_trips (id)   
);

CREATE TABLE user_vehicle_txn (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    trip_id INT,
    trip_start_date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    trip_end_date_time DATETIME,
    FOREIGN KEY (user_id) REFERENCES user_details (id),
    FOREIGN KEY (trip_id) REFERENCES vehicle_trips (id)   
);

CREATE TABLE trip_request_temp (
    id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT,
    pilot_id INT,
    passenger_id INT,
    FOREIGN KEY (trip_id) REFERENCES vehicle_trips (id),
    FOREIGN KEY (pilot_id) REFERENCES user_details (id),
    FOREIGN KEY (passenger_id) REFERENCES user_details (id)
);

ALTER TABLE trip_request_temp RENAME trip_request_queue;

USE uladb;

DELIMITER $$

DROP TRIGGER IF EXISTS uladb.after_user_vehicle_txn_insert; $$

CREATE TRIGGER uladb.after_user_vehicle_txn_insert AFTER INSERT 
ON user_vehicle_txn
FOR EACH ROW
BEGIN
    UPDATE current_available_vehicles SET available_seats = available_seats - 1 WHERE trip_id = NEW.trip_id;
    
    DELETE FROM trip_request_queue WHERE trip_id = NEW.trip_id AND passenger_id = NEW.user_id;
END $$

DELIMITER ;




USE uladb;

DELIMITER $$

DROP TRIGGER IF EXISTS uladb.after_user_vehicle_txn_insert; $$

CREATE TRIGGER uladb.after_user_vehicle_txn_insert AFTER INSERT 
ON user_vehicle_txn
FOR EACH ROW
BEGIN
    UPDATE current_available_vehicles SET available_seats = available_seats - 1 WHERE trip_id = NEW.trip_id;
    
    DELETE FROM trip_request_queue WHERE trip_id = NEW.trip_id AND passenger_id = NEW.user_id;
END $$

DELIMITER ;






USE uladb;

DELIMITER $$

DROP TRIGGER IF EXISTS after_vehicle_trips_update;

CREATE TRIGGER after_vehicle_trips_update AFTER UPDATE 
ON vehicle_trips
FOR EACH ROW
BEGIN
    IF (NEW.trip_status = 'COMPLETED') THEN
        DELETE FROM current_available_vehicles WHERE trip_id = OLD.trip_id;
        
        UPDATE vehicle_trips SET trip_end_date_time = CURRENT_TIMESTAMP WHERE id = OLD.id;
        
        UPDATE user_vehicle_txn SET trip_end_date_time = CURRENT_TIMESTAMP WHERE trip_id = OLD.trip_id;
    END IF;
END $$

DELIMITER ;
