import Dexie from 'dexie';
import { Usuario } from './usuario'

export class AppDB extends Dexie {
  public usuario!: Dexie.Table<Usuario, number>;

  constructor() {
    super('userDatabase');

    var db = this;

    this.version(3).stores({
      usuario: '++id, nome, email',
    });
    
    db.usuario.mapToClass(Usuario);
  }
}

export const db = new AppDB();
