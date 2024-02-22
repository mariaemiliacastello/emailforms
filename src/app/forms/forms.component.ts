import { Component, OnInit } from '@angular/core';
import  {  FormBuilder,  FormGroup, FormsModule, ReactiveFormsModule  }  from  '@angular/forms';
import { Usuario } from '../usuario';
import { db } from '../db'
import { liveQuery } from 'dexie';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-forms',
    standalone: true,
    templateUrl: './forms.component.html',
    styleUrl: './forms.component.css',
    imports: [ReactiveFormsModule, CommonModule, FormsModule]
})
export class FormsComponent implements OnInit{
  form!: FormGroup;
  nome: string = '';
  usuarioDeletar: string = '';

  constructor(private formBuilder: FormBuilder){};
  users$: any;
  
  ngOnInit() {
    this.criarForm(new Usuario());
  }

  criarForm(usuario: Usuario) {
    this.form = this.formBuilder.group({
      nome: [usuario.nome],
      email: [usuario.email]
    })
  }
  
  async adicionarUsuario() {
    await db.usuario.add({
      nome: this.form.value.nome,
      email: this.form.value.email
    });
  }

  async listarEmails(){ 
    return await db.usuario.where({
      nome: this.nome
    }).toArray();
  }

  async submeter() {
    this.adicionarUsuario();
  }

  chamarUsuarios(){
    this.users$ = liveQuery(() => this.listarEmails());
  }
  
  resetarTabela(){
    db.usuario.clear();
  }

  deletarUsuario(){
    db.usuario.where('nome').equals(this.usuarioDeletar).delete();
  }
}

