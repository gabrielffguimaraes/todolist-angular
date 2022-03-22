import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTable} from "@angular/material/table";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  bgColors: string [] = [
    'rgba(33,252,69,1)',
    'rgba(35,98,238,1)',
    'rgba(239,151,148,1)',
    'rgba(46,44,219,1)',
    'rgba(206,84,239,1)',
  ];
  isEditable: boolean = false;
  currentEditInput?: number;
  @ViewChild("table1") table1?: MatTable<todoListItems> ;
  myForm:FormGroup;
  todoList: todoListItems[] = new Array<todoListItems>();
  displayedColumns: string[] = ['item','actions'];
  constructor(private formBuilder:FormBuilder) {
    this.myForm = this.formBuilder.group({
      description: [ null , Validators.required]
    });
  }
  ngOnInit(): void {}

  adicionar(): void {
    if (this.myForm.valid) {
      let description: string = this.myForm.get("description")?.value;
      this.todoList.push({item:description,bgColor:this.bgColors[Math.floor(Math.random()*this.bgColors.length)]});
      this.table1?.renderRows();
      this.myForm.reset();
    }
  }
  deletar(index: number): void {
    this.todoList.splice(index,1);
    this.table1?.renderRows();
  }
  load(): todoListItems[] {
    return this.todoList;
  }
  prepEdit(index: number): void {
    this.currentEditInput = index;
    this.isEditable = true;
    // @ts-ignore
    document.getElementById("editable").value = this.todoList[index].item;
  }
  editar() :void {
    // @ts-ignore
    this.todoList[this.currentEditInput].item = document.getElementById("editable").value;
    this.isEditable = false;
  }
}

interface todoListItems {
  item:string,
  bgColor:string
}
