1. 1NF TABLE
    - Columns have atomic values.
    - In each column the values stored must be of the same kind or type.
    - Unique name for Attributes/Columns

                                                                     ORDER TABLE
                PRIMARY KEY                                                                                             PRIMARY KEY
                +-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
                | member_id | member_name   | member_address | dinner_id | dinner_date | venue_code | venue_description | food_code | food_description |
                +-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
                |         1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1        | Curry            |
                |         1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C2        | Cake             |
                |         2 | Ben           | 24 Hudson lane | D00001002 | 2020-03-15  | B02        | Zoku Roof Top     | S1        | Soup             |
                |         2 | Ben           | 24 Hudson lane | D00001002 | 2020-03-15  | B02        | Zoku Roof Top     | C2        | Cake             |
                |         3 | Cristina      | 516 6th Ave    | D00001002 | 2020-03-15  | B02        | Zoku Roof Top     | S1        | Soup             |
                |         3 | Cristina      | 516 6th Ave    | D00001002 | 2020-03-15  | B02        | Zoku Roof Top     | C2        | Cake             |
                |         4 | Dan           | 89 John St     | D00001003 | 2020-03-20  | B03        | Goat Farm         | P1        | Pie              |
                |         4 | Dan           | 89 John St     | D00001003 | 2020-03-20  | B03        | Goat Farm         | T1        | Tea              |
                |         4 | Dan           | 89 John St     | D00001003 | 2020-03-20  | B03        | Goat Farm         | M1        | Mousse           |
                |         5 | Ema           | 91 Pixar St    | D00001003 | 2020-03-20  | B03        | Goat Farm         | P1        | Pie              |
                |         5 | Ema           | 91 Pixar St    | D00001003 | 2020-03-20  | B03        | Goat Farm         | T1        | Tea              |
                |         5 | Ema           | 91 Pixar St    | D00001003 | 2020-03-20  | B03        | Goat Farm         | M1        | Mousse           |
                |         6 | Fatima        | 56 8th Ave     | D00001004 | 2020-03-20  | B04        | Mama's Kitchen    | F1        | Falafal          |
                |         6 | Fatima        | 56 8th Ave     | D00001004 | 2020-03-20  | B04        | Mama's Kitchen    | M1        | Mousse           |
                |         7 | Gabor         | 54 Vivaldi St  | D00001005 | 2020-02-20  | B05        | Hungry Hungary    | G1        | Goulash          |
                |         7 | Gabor         | 54 Vivaldi St  | D00001005 | 2020-02-20  | B05        | Hungry Hungary    | P2        | Pasca            |
                |         8 | Hema          | 9 Peter St     | D00001003 | 2020-03-20  | B03        | Goat Farm         | P1        | Pie              |
                |         8 | Hema          | 9 Peter St     | D00001003 | 2020-03-20  | B03        | Goat Farm         | T1        | Tea              |
                |         8 | Hema          | 9 Peter St     | D00001003 | 2020-03-20  | B03        | Goat Farm         | M1        | Mousse           |
                +-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+

Super Keys : member_id, member_name, member_address, dinner_id, food_code, venue code
Candidate Keys : member_id, dinner_id, food_code
Primary Keys: member_id, food_code (In this case, a composite key). They can describe each rows uniquely together.

1. 2NF TABLE
- The table should be in the First Normal Form.
- There should be no Partial Dependency. 

In our case member_id and food_code are our composite key set. member_name and member_address are dependent on member_id, but not dependent on food_code. Also, food_description is dependent on food_code but not on member_name. That's mean there is a partial dependency for these columns and we should seperate them. dinner_id, dinner_date, venue_code, venue_description are determined by composite key pair, so they don't have partial dependency.

                                MEMBER TABLE                                    FOOD TABLE

                PRIMARY KEY                                         PRIMARY KEY
                +-----------+---------------+----------------+      +-----------+------------------+
                | member_id | member_name   | member_address |      | food_code | food_description |
                +-----------+---------------+----------------+      +-----------+------------------+
                |         1 | Amit          | 325 Max park   |      | C1        | Curry            |
                |         2 | Ben           | 24 Hudson lane |      | C2        | Cake             |
                |         3 | Cristina      | 516 6th Ave    |      | F1        | Falafal          |
                |         4 | Dan           | 89 John St     |      | M1        | Mousse           |
                |         5 | Ema           | 91 Pixar St    |      | S1        | Soup             |
                |         6 | Fatima        | 56 8th Ave     |      | P1        | Pie              |
                |         7 | Gabor         | 54 Vivaldi St  |      | P2        | Pasca            |
                |         8 | Hema          | 9 Peter St     |      | T1        | Tea              |
                +-----------+---------------+----------------+      | G1        | Goulash          |
                                                                    +-----------+------------------+

                                                MEMBER_FOOD TABLE

                PRIMARY KEY                                                            PRIMARY KEY
                +-----------+-----------+-------------+------------+-------------------+-----------+
                | member_id | dinner_id | dinner_date | venue_code | venue_description | food_code |
                +-----------+-----------+-------------+------------+-------------------+-----------+
                |         1 | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1        |
                |         1 | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C2        |
                |         2 | D00001002 | 2020-03-15  | B02        | Zoku Roof Top     | S1        |
                |         2 | D00001002 | 2020-03-15  | B02        | Zoku Roof Top     | C2        |
                |         3 | D00001002 | 2020-03-15  | B02        | Zoku Roof Top     | S1        |
                |         3 | D00001002 | 2020-03-15  | B02        | Zoku Roof Top     | C2        |
                |         4 | D00001003 | 2020-03-20  | B03        | Goat Farm         | P1        |
                |         4 | D00001003 | 2020-03-20  | B03        | Goat Farm         | T1        |
                |         4 | D00001003 | 2020-03-20  | B03        | Goat Farm         | M1        |
                |         5 | D00001003 | 2020-03-20  | B03        | Goat Farm         | P1        |
                |         5 | D00001003 | 2020-03-20  | B03        | Goat Farm         | T1        |
                |         5 | D00001003 | 2020-03-20  | B03        | Goat Farm         | M1        |
                |         6 | D00001004 | 2020-03-20  | B04        | Mama's Kitchen    | F1        |
                |         6 | D00001004 | 2020-03-20  | B04        | Mama's Kitchen    | M1        |
                |         7 | D00001005 | 2020-02-20  | B05        | Hungry Hungary    | G1        |
                |         7 | D00001005 | 2020-02-20  | B05        | Hungry Hungary    | P2        |
                |         8 | D00001003 | 2020-03-20  | B03        | Goat Farm         | P1        |
                |         8 | D00001003 | 2020-03-20  | B03        | Goat Farm         | T1        |
                |         8 | D00001003 | 2020-03-20  | B03        | Goat Farm         | M1        |
                +-----------+-----------+-------------+------------+-------------------+-----------+   

2. 3NF TABLE

Now, it is time to look for any non-primary columns relates one-another. dinner_date is determined by dinner_id, likewise venue_description determined by venue_code.Now all tables are related to their primary keys. Also we have MEMBER_FOOD and MEMBER_DINNER tables to meet many-to-many tables. It is also possible to turn back to the 1st table, de-normalization, with combining them with the Primary Keys. 

                **MEMBER_FOOD TABLE**                       **MEMBER TABLE**                             **FOOD TABLE**
                    **PK**      **PK**     **PRIMARY KEY**                                    **PRIMARY KEY**          
                +-----------+-----------+   +-----------+---------------+----------------+      +-----------+------------------+
                | member_id | food_code |   | member_id | member_name   | member_address |      | food_code | food_description |
                +-----------+-----------+   +-----------+---------------+----------------+      +-----------+------------------+
                |         1 | C1        |   |         1 | Amit          | 325 Max park   |      | C1        | Curry            |
                |         1 | C2        |   |         2 | Ben           | 24 Hudson lane |      | C2        | Cake             |
                |         2 | S1        |   |         3 | Cristina      | 516 6th Ave    |      | F1        | Falafal          |
                |         2 | C2        |   |         4 | Dan           | 89 John St     |      | M1        | Mousse           |
                |         3 | S1        |   |         5 | Ema           | 91 Pixar St    |      | S1        | Soup             |
                |         3 | C2        |   |         6 | Fatima        | 56 8th Ave     |      | P1        | Pie              |
                |         4 | P1        |   |         7 | Gabor         | 54 Vivaldi St  |      | P2        | Pasca            |
                |         4 | T1        |   |         8 | Hema          | 9 Peter St     |      | T1        | Tea              |
                |         4 | M1        |   +-----------+---------------+----------------+      | G1        | Goulash          |
                |         5 | P1        |                                                       +-----------+------------------+
                |         5 | T1        |   
                |         5 | M1        |               **DINNER TABLE**                          **VENUE TABLE**
                |         6 | F1        |   +-----------+-------------+------------+    +------------+-------------------+
                |         6 | M1        |   | dinner_id | dinner_date | venue_code |    | venue_code | venue_description |
                |         7 | G1        |   +-----------+-------------+------------+    +------------+-------------------+
                |         7 | P2        |   | D00001001 | 2020-03-15  | B01        |    | B01        | Grand Ball Room   |
                |         8 | P1        |   | D00001002 | 2020-03-15  | B02        |    | B02        | Zoku Roof Top     |
                |         8 | T1        |   | D00001003 | 2020-03-20  | B03        |    | B03        | Goat Farm         |
                |         8 | M1        |   | D00001004 | 2020-03-20  | B04        |    | B04        | Mama's Kitchen    |
                +-----------+-----------+   | D00001005 | 2020-02-20  | B05        |    | B05        | Hungry Hungary    |
                                            +-----------+-------------+------------+    +------------+-------------------+
                                            **PRIMARY KEY**          **FOREIGN KEY**   **PRIMARY KEY**
                
                 **MEMBER_DINNER TABLE** 
                    **PK**     **PK**
                +-----------+-----------+
                | dinner_id | member_id |
                +-----------+-----------+
                | D00001001 | 1         |
                | D00001002 | 2         |
                | D00001002 | 3         |
                | D00001003 | 4         |
                | D00001003 | 8         |
                | D00001004 | 6         |
                | D00001005 | 7         |
                +-----------+-----------+