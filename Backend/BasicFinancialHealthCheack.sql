DROP DATABASE IF EXISTS BasicFinancialHealthcheack;
CREATE DATABASE BasicFinancialHealthcheack;
USE BasicFinancialHealthcheack;

/* Login user  */

CREATE TABLE Registration (
    id INT(11) NOT NULL AUTO_INCREMENT,
    User_Email VARCHAR(50) NOT NULL,
    User_Password VARCHAR(50) NOT NULL,
    User_registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

    



/* User financial information */
CREATE TABLE Userinfo (
    UserID int not null primary key,
    User_Name varchar(255),
    User_birthday DATE,
    User_phone varchar(10),
    User_sex varchar(6),
    User_marital_status varchar(20),
    User_alias varchar(255),
    User_income int,
    User_job varchar(255),
    User_income_per_month int,
    User_expense int,
    User_expense_per_month int,
    User_fixed_cost int,
    User_asset int,
    User_liabilities int,
    User_saving int,
    User_variable_cost int,
    User_external_debt int,
    User_internal_debt int,
    User_insurance int
);

/* Grading Level by Money Index */
CREATE TABLE GradeLevel (
    GradeID int,
    Grade_level int,
    Grade_SavingRatio decimal,
    Grade_DebtRatio decimal,
    Grade_EmergencyRatio decimal,
    Grade_Networth decimal,
    Grade_level_name varchar(255),
    Grade_description varchar(255),
    Grade_Record varchar(255),
    Grade_date date,
    UserID int,
    primary key (GradeID),
    foreign key (UserID) REFERENCES Userinfo(UserID)
    
);

/* 9 Jars money management */
CREATE TABLE NineJars (
    JarID int,
    Jar_level int,
    Jar_Ness int,
    Jar_Edu int,
    Jar_Play int,
    Jar_Give int,
    Jar_Insurance int,
    Jar_Retirement int,
    Jar_Emergency int,
    Jar_MoneyFreedom int,
    Jar_Debt int,
    primary key (JarID)
);

/* Staging Level */
CREATE TABLE StageLevel (
    StageID int,
    Stage_name varchar(255),
    Stage_description varchar(255),
    Stage_Record varchar(255),
    GradeID int,
    JarID int,
    primary key (StageID),
    foreign key (GradeID) REFERENCES GradeLevel(GradeID),
    foreign key (JarID) REFERENCES NineJars(JarID)
);

/* Suggestion */
CREATE TABLE SuggestInfo (
    SuggestID int not null primary key,
    Suggest_name varchar(255),
    Suggest_description varchar(255),
    Suggest_Record varchar(255)
);

/* Suggestion and Mapping */
CREATE TABLE SuggestandMap (
    SM_ID int,
    StageID int,
    primary key(SM_ID, StageID),
    foreign key (SM_ID) REFERENCES SuggestInfo(SuggestID),
    foreign key(StageID) REFERENCES StageLevel(StageID)
);

/* Inserting data into Registration table */
INSERT INTO Registration (User_Email, User_Password) 
VALUES ('johndoe@example.com', '1234');

/* Inserting data into Userinfo table */
INSERT INTO Userinfo (UserID, User_Name, User_birthday, User_phone, User_sex, User_marital_status, User_alias, User_income, User_job, User_income_per_month, User_expense, User_expense_per_month, User_fixed_cost, User_asset, User_liabilities, User_saving, User_variable_cost, User_external_debt, User_internal_debt, User_insurance)
VALUES (1, 'John Doe', '1990-01-01', '1234567890', 'ชาย', 'Single', 'JD', 50000, 'Engineer', 40000, 20000, 15000, 10000, 100000, 50000, 50000, 20000, 5000, 2000, 10000);

/* Inserting data into GradeLevel table */
INSERT INTO GradeLevel (GradeID, Grade_level, Grade_SavingRatio, Grade_DebtRatio, Grade_EmergencyRatio, Grade_Networth, Grade_level_name, Grade_description, Grade_Record, Grade_date, UserID)
value(1,0,0,0,0,0,0,'','',NOW(),1);

/* Inserting data into NineJars table */
INSERT INTO NineJars (JarID, Jar_level, Jar_Ness, Jar_Edu, Jar_Play, Jar_Give, Jar_Insurance, Jar_Retirement, Jar_Emergency, Jar_MoneyFreedom, Jar_Debt)
VALUES (1, 1, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000);

/* Inserting data into StageLevel table */
INSERT INTO StageLevel (StageID, Stage_name, Stage_description, Stage_Record, GradeID, JarID)
VALUES (1, 'Stage 1', 'Description for Stage 1', 'Record for Stage 1', 1, 1);

/* Inserting data into SuggestInfo table */
INSERT INTO SuggestInfo (SuggestID, Suggest_name, Suggest_description, Suggest_Record)
VALUES (1, 'Suggestion 1', 'Description for Suggestion 1', 'Record for Suggestion 1');

/* Inserting data into SuggestandMap table */
INSERT INTO SuggestandMap (SM_ID, StageID)
VALUES (1, 1);




