import { Album } from 'src/modules/album/entities/album.entity';
import { Track } from 'src/modules/track/entities/track.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  tracks: Track[];
}
