import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
    private readonly saltRounds = 10;
    private readonly jwtSecret = 'sam265';

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async createUser(name: string, email: string, password: string) {
        try {
            const hashedPassword = await bcrypt.hash(password, this.saltRounds);
            const newUser = this.userRepository.create({ name, email, password: hashedPassword });
            return await this.userRepository.save(newUser);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error('Email already exists');
            }
            throw new Error('User registration failed: ' + error.message);
        }
    }

    async SignIn(name: string, password: string) {
        const user = await this.userRepository.findOne({ where: { name } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid Credentials');
        }
        const payload = { name: user.name, sub: user.id };
        return jwt.sign(payload, this.jwtSecret, { expiresIn: '24h' });
    }
}
