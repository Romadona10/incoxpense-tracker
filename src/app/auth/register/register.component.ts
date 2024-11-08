import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; // Import AuthService
import { HttpErrorResponse } from '@angular/common/http'; // For error handling
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hidePassword = true;
  capturedImage: string | null = null;
  isLoading: boolean = false;
  isVideoVisible: boolean = true;
  isImageCaptured:boolean = true
  
  
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvasElement!: ElementRef<HTMLCanvasElement>;

  private videoStream!: MediaStream;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService,private snackbar:MatSnackBar) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required], // Updated field name to match the backend
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required,Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.startCamera();
  }

  startCamera(): void {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      this.videoStream = stream;
      this.videoElement.nativeElement.srcObject = stream;
    }).catch((err) => {
      console.error("Error accessing camera: ", err);
    });
  }

  captureImage(): void {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;

    // Draw the current frame from the video onto the canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.capturedImage = canvas.toDataURL('image/png'); // Get image data as base64 URL
      this.isVideoVisible = false;
      this.isImageCaptured = false
    }

    // Stop the video stream to turn off the camera
    this.stopCamera();
  }

  stopCamera(): void {
    if (this.videoStream) {
      const tracks = this.videoStream.getTracks();
      tracks.forEach(track => track.stop()); 
    }
  }

 

  
  
  onSubmitRegister(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
  
      // Prepare user data (User object)
      const formData = {
        fullName: this.registerForm.get('fullName')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value
      };
  
      let file: File | undefined = undefined;
  
      // Convert base64 image to a File object if an image was captured
      if (this.capturedImage) {
        const blob = this.base64ToBlob(this.capturedImage, 'image/png');
        file = new File([blob], 'profile-pic.png', { type: 'image/png' });
      }
  
      // Delay for better UX (optional)
      setTimeout(() => {
        // Call the AuthService to register the user with the image
        this.authService.register(formData, file).subscribe(
          response => {
            this.snackbar.open('Registration successful', 'close');
            this.router.navigateByUrl('/auth/login');
          },
          (error: HttpErrorResponse) => {
            console.error('Registration error:', error);
            this.snackbar.open('Registration error, this email already exists', 'close');
          }
        ).add(() => {
          this.isLoading = false;
        });
      }, 5000);
    }
  }
  
  // Helper method to convert base64 to Blob
base64ToBlob(base64: string, type: string): Blob {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteNumbers = new Uint8Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  return new Blob([byteNumbers], { type });
}

 
  
  
  
  
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  
  switchToLogin() {
    this.router.navigateByUrl('/auth/login');
  }
}
