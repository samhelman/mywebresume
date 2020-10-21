import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FireService } from '../services/fire.service';
import { FlashService } from '../services/flash.service';
import { Education, Experience, Portfolio, UserData } from '../services/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public data: Array<UserData>;

  //info fields
  public name: string;
  public username: string;
  public tagline: string;
  public statement: string;
  public picUrl: string;

  public usernameIsValid: boolean = true;

  //experience fields
  public companyName: string;
  public position: string;
  public companyDescription: string;
  public experienceSkill: string;
  public experienceSkillsList: Array<string>;

  //education fields
  public schoolName: string;
  public highlights: string;
  public qualification: string;

  //portfolio fields
  public projectName: string;
  public projectDescription: string;
  public portfolioSkill: string;
  public portfolioSkillsList: Array<string>;
  public link: string;

  public greySkills: Array<string> = [];
  public newSkills: Array<string> = [];
  public removedSkillsQueue: Array<string> = [];

  public selectedData: string = 'info';
  public selectedIndex: number;

  public upload: boolean;
  public resumeUrl: string;

  public experienceIsOpen: boolean;
  public educationIsOpen: boolean;
  public portfolioIsOpen: boolean;

  constructor(
    private titleService: Title,
    private fire: FireService,
    private flashService: FlashService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('MyWebResume - Dashboard');
    this.getUserData();
    if (document.getElementById('nav')) {
      document.getElementById('nav').style.display = 'initial';
    }
  }

  async getUserData(option?: string, index?: number) {
    await this.fire
      .getCurrentUserData()
      .then(
        response => {
          response.subscribe(res => {
            this.data = res
            if (this.data[0].info.name) {
              this.name = this.data[0].info.name
            } else {
              this.flashService.createFlashMessage('Get started by adding a name to check out your web resume!')
            }
            if (this.data[0].info.username) {
              this.username = this.data[0].info.username
              this.resumeUrl = `https://${window.location.host}/${this.username}`
            }
            if (this.data[0].info.tagline) {
              this.tagline = this.data[0].info.tagline
            }
            if (this.data[0].info.statement) {
              this.statement = this.data[0].info.statement
            }
            if (this.data[0].info.profilePic) {
              this.picUrl = this.data[0].info.profilePic
            }
            if (option && index >= 0 && this.data[0][option][index]) {
              if (option == 'experience') {
                this.companyName = this.data[0][option][index].companyName
                this.position = this.data[0][option][index].position
                this.companyDescription = this.data[0][option][index].description
                this.experienceSkillsList = this.data[0][option][index].skills
              } else if (option == 'education') {
                this.schoolName = this.data[0][option][index].schoolName
                this.qualification = this.data[0][option][index].qualification
                this.highlights = this.data[0][option][index].highlights
              } else if (option == 'portfolio') {
                this.projectName = this.data[0][option][index].projectName
                this.link = this.data[0][option][index].link
                this.projectDescription = this.data[0][option][index].description
                this.portfolioSkillsList = this.data[0][option][index].skills
              }
            this.greySkills = [];
            this.removedSkillsQueue = [];  
            }
          })
        }
      ) 
  }

  updateUser(validate: boolean = false) {
    if (validate) {
      this.fire.getCurrentUser().then(
        response => {
          this.fire.usernameIsValid(response.uid, this.username).subscribe(
            response => {
              if (response.length == 0) {
                this.usernameIsValid = true
                this.fire.getCurrentUser().then(
                  response => {
                    let userData = {
                      name: this.name ? this.name : '',
                      username: this.username ? this.username : ''
                    };
                    this.fire.updateUser(response.uid, userData)
                    let resumeData = {
                      info: {
                        name: this.name ? this.name : '',
                        username: this.username ? this.username : '',
                        tagline: this.tagline ? this.tagline : '',
                        statement: this.statement ? this.statement : '',
                        profilePic: this.picUrl ? this.picUrl : 'https://firebasestorage.googleapis.com/v0/b/mywebresume-d952a.appspot.com/o/profilePics%2Fdefaultpp.jpg?alt=media&token=af2f1166-fefa-450a-90c5-667d0fe8b4d7'
                      },
                      experience: this.data[0].experience,
                      education: this.data[0].education,
                      portfolio: this.data[0].portfolio
                    }
                    this.fire.updateUserResume(response.uid, resumeData)
                    this.flashService.createFlashMessage('Update successful.', 'success');
                  }
                ).catch(
                  error => console.log(`error ${error}`)
                )
              } else {
                this.usernameIsValid = false
                this.getUserData()
                this.flashService.createFlashMessage('This username is already in use, please pick a unique username.', 'danger')
              }
            }
          )
        }
      )
    } else {
      this.fire.getCurrentUser().then(
        response => {
          let userData = {
            name: this.name ? this.name : '',
            username: this.username ? this.username : ''
          };
          this.fire.updateUser(response.uid, userData)
          let resumeData = {
            info: {
              name: this.name ? this.name : '',
              username: this.username ? this.username : '',
              tagline: this.tagline ? this.tagline : '',
              statement: this.statement ? this.statement : '',
              profilePic: this.picUrl ? this.picUrl : 'https://firebasestorage.googleapis.com/v0/b/mywebresume-d952a.appspot.com/o/profilePics%2Fdefaultpp.jpg?alt=media&token=af2f1166-fefa-450a-90c5-667d0fe8b4d7'
            },
            experience: this.data[0].experience,
            education: this.data[0].education,
            portfolio: this.data[0].portfolio
          }
          this.fire.updateUserResume(response.uid, resumeData)
        }
      ).catch(
        error => console.log(`error ${error}`)
      )
    }
    this.greySkills = [];    
  }

  uploadFile(event) {
    this.fire.upload(event).then(
      response => response.subscribe(
        response => {
          this.picUrl = response
          this.updateUser()
        }
      )
    ).catch(
      error => console.log(`error: ${error}`)
    )
  }

  select(option: string, index?: number) {
    this.selectedData = option;
    this.selectedIndex = index;
    this.getUserData(option, index);
  }

  addItem(option: string) {
    var newItem;
    if (option == 'experience') {
      newItem = <Experience>{
        companyName: 'Company Name',
        position: '',
        description: '',
        skills: []
      }
      this.data[0].experience.push(newItem)
      this.select(option, this.data[0].experience.length - 1)
    } else if (option == 'education') {
      newItem = <Education>{
        schoolName: 'School Name',
        qualification: '',
        highlights: ''
      }
      this.data[0].education.push(newItem)
      this.select(option, this.data[0].education.length - 1)
    } else if (option == 'portfolio') {
      newItem = <Portfolio>{
        projectName: 'Project Name',
        link: '',
        description: '',
        skills: []
      }
      this.data[0].portfolio.push(newItem)
      this.select(option, this.data[0].portfolio.length - 1)
    }
    option = option.charAt(0).toUpperCase() + option.slice(1)
    this.flashService.createFlashMessage(`A new '${option} Item' was created.`)
    this.updateUser();
    this.openSection(option)
  }

  removeItem(option: string, index: number) {
    let item = this.data[0][option][index]
    let name: string;
    if (option == 'experience') {
      name = item.companyName
    } else if (option == 'education') {
      name = item.schoolName
    } else if (option == 'portfolio') {
      name = item.projectName
    }
    this.data[0][option].splice(index, 1);
    this.updateUser();
    this.flashService.createFlashMessage(`'${name}' was deleted successfully.`, 'success')
    this.select('info')
  }

  updateItem(option: string, index: number) {
    if (option == 'experience') {
      this.removedSkillsQueue.forEach(
        skill => {
          let index = this.experienceSkillsList.indexOf(skill)
          this.experienceSkillsList.splice(index, 1)
        }
      );
      this.data[0][option][index] = {
        companyName: this.companyName ? this.companyName : '',
        position: this.position ? this.position : '',
        description: this.companyDescription ? this.companyDescription : '',
        skills: this.experienceSkillsList ? this.experienceSkillsList : []
      }
    } else if (option == 'education') {
      this.data[0][option][index] = {
        schoolName: this.schoolName ? this.schoolName : '',
        highlights: this.highlights ? this.highlights : '',
        qualification: this.qualification ? this.qualification : '',
      }
    } else if (option == 'portfolio') {
      this.removedSkillsQueue.forEach(
        skill => {
          let index = this.portfolioSkillsList.indexOf(skill)
          this.portfolioSkillsList.splice(index, 1)
        }
      );
      this.data[0][option][index] = {
        projectName: this.projectName ? this.projectName : '',
        description: this.projectDescription ? this.projectDescription : '',
        skills: this.portfolioSkillsList ? this.portfolioSkillsList : [],
        link: this.link ? this.link : ''
      }
    }
    this.updateUser()
    this.flashService.createFlashMessage('Update successful.', 'success');
  }

  openSection(option: string) {
    this.experienceIsOpen = false;
    this.educationIsOpen = false;
    this.portfolioIsOpen = false;
    if (option == 'experience') {
      this.experienceIsOpen = true;
    } else if (option == 'education') {
      this.educationIsOpen = true;
    } else if (option == 'portfolio') {
      this.portfolioIsOpen = true;
    }
  }

  addSkill(option: string, index: number) {
    var newSkill: string;
    var skillsList: Array<string>;
    if (option == 'experience') {
      newSkill = this.experienceSkill;
      skillsList = this.experienceSkillsList
    } else if (option == 'portfolio') {
      newSkill = this.portfolioSkill;
      skillsList = this.portfolioSkillsList
    }
    if (newSkill && !skillsList.includes(newSkill)) {
      this.newSkills.push(newSkill)
      this.greySkills.push(newSkill)
      skillsList.push(newSkill)
      this.flashService.createFlashMessage('Remember to update to confirm your changes to your skills.', 'info')
    }
    this.experienceSkill = '';
    this.portfolioSkill = '';
  }

  removeSkill(index: number) {
    var removedSkill: string;
    var skillsList: Array<string>;
    if (this.selectedData == 'experience') {
      skillsList = this.experienceSkillsList
    } else if (this.selectedData == 'portfolio') {
      skillsList = this.portfolioSkillsList
    }
    removedSkill = skillsList[index];
    if (this.removedSkillsQueue.includes(removedSkill) && this.data[0][this.selectedData][this.selectedIndex][index].includes(removedSkill)) {
      skillsList.splice(index, 1)
    } else {
      this.removedSkillsQueue.push(removedSkill);
    }
    this.greySkills.push(removedSkill);
  }
}