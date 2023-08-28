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