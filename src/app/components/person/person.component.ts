import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PersonInterface } from 'src/app/interfaces/person-interface';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'test-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  isEdit!: boolean;
  index!: number;
  person!: PersonInterface;

  constructor(
    private personServive: PersonasService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    let peopleList: PersonInterface[] = [];
    this.dataSource = new MatTableDataSource(peopleList);

    this.personForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        age: ['', Validators.required]
      }
    );

    this.list();
  }



  // For form and CRUD
  personForm!: FormGroup;

  saveData() {
    console.log(this.personForm.value);
    this.personForm.value.id = '';
    if (this.isEdit) {
      this.personForm.value.id = this.person.id;
    }
    this.personServive.save(this.personForm.value).subscribe(
      response => {
        if (this.isEdit) {
          this.dataSource.data.splice(this.index, 1, response);
          this.dataSource = new MatTableDataSource(this.dataSource.data);
        } else {
          this.dataSource.data.push(response);
          this.dataSource = new MatTableDataSource(this.dataSource.data);
        }

        alert('Se guardo la persona');
        this.personForm.reset();
      },
      error => {
        alert('No se pudo guardar');
      }
    );
  }

  edit(personInterface: PersonInterface, index: number) {
    this.personForm.controls['name'].setValue(personInterface.name);
    this.personForm.controls['age'].setValue(personInterface.age);
    this.isEdit = true;
    this.index = index;
    this.person = personInterface;
  }

  delete(person: PersonInterface, index: number) {
    this.personServive.delete(person.id).subscribe(
      response => {
        if (response === true) {
          this.dataSource.data.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.dataSource.data)
          alert('Se eliminó exitosamente');
        }
      },
      error => {
        alert('No se pudo eliminar');
      }
    );
  }

  list() {
    this.personServive.list().subscribe(
      response => {
        this.dataSource = new MatTableDataSource(response);
      },
      error => {
        alert('Np se pudo obtener las personas');
      }
    );
  }


  // For table
  displayedColumns: string[] = ['name', 'age', 'action'];
  dataSource!: MatTableDataSource<PersonInterface>;

}
