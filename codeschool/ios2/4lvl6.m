// Dissmiss instead of pop back
#import "ProfileEditViewController.h"
#import "User.h"

@implementation ProfileEditViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
     self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
     if (self) {
          self.title = @"Location Edit";
     }
     return self;
}

- (void)viewDidLoad
{
     [super viewDidLoad];

     self.view.backgroundColor = [UIColor whiteColor];

     self.locationField = [[UITextField alloc] init];
     self.locationField.frame = CGRectMake(15, 50, 280, 40);
     self.locationField.borderStyle = UITextBorderStyleBezel;
     self.locationField.keyboardType = UIKeyboardTypeDefault;
     self.locationField.text = self.user.location;
     self.locationField.delegate = self;

     [self.view addSubview:self.locationField];

     UIButton *saveButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
     saveButton.frame = CGRectMake(15, 100, 280, 50);
     [saveButton setTitle:@"Save Location" forState:UIControlStateNormal];
     [self.view addSubview:saveButton];
     [saveButton addTarget:self
          action:@selector(saveLocation)
          forControlEvents:UIControlEventTouchUpInside];
}

- (void)saveLocation
{
     self.user.location = self.locationField.text;

     // --> See that!
     [self dismissViewControllerAnimated:YES completion:nil];
}

- (void)viewWillAppear:(BOOL)animated
{
     self.locationField.text = self.user.location;
}

- (BOOL)textFieldShouldReturn:(UITextField *)textField {
     self.user.location = textField.text;

     [textField resignFirstResponder];
     return YES;
}

@end
