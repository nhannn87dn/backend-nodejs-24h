# Session 6

## Connect to SQLServer

## Connect to SQLServer Using TypeORM

### Step 1: install

```bash
yarn add typeorm reflect-metadata mssql
```

### Step 2: Model

Tạo một tệp user.model.js (hoặc user.model.ts nếu bạn đang sử dụng TypeScript) để định nghĩa User Entity (Model):

```js
const { Entity, PrimaryGeneratedColumn, Column } = require('typeorm');

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  firstName;

  @Column()
  lastName;

  @Column({ unique: true })
  email;

  @Column({ unique: true })
  phoneNumber;

  @Column()
  password;
}

module.exports = User;
```


## Deployment