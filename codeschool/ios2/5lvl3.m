// Foreground/Background, notifications

#import "ProfileEditViewController.h"

@implementation ProfileEditViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
     self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
     if (self) {
          self.title = @"Edit Location";

          [[NSNotificationCenter defaultCenter] addObserver:self
               selector:@selector(saveUserWhenClosing)
               name:UIApplicationDidEnterBackgroundNotification
               object:nil];

     }
     return self;
}

- (void)viewWillAppear:(BOOL)animated {
     self.locationField.text = self.user.location;
}

- (void)viewDidLoad
{
     [super viewDidLoad];

     self.view.backgroundColor = [UIColor whiteColor];

     UILabel *locationLabel = [[UILabel alloc] init];
     locationLabel.frame = CGRectMake(20,15,50,30);
     locationLabel.text = @"location: ";
     [self.view addSubview:locationLabel];

     self.locationField = [[UITextField alloc] init];
     self.locationField.frame = CGRectMake(15,50,290,30);
     self.locationField.borderStyle = UITextBorderStyleBezel;
     self.locationField.keyboardType = UIKeyboardTypeDefault;
     self.locationField.delegate = self;
     [self.view addSubview:self.locationField];

     UIButton *saveButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
     saveButton.frame = CGRectMake(15,100,290,50);
     [saveButton setTitle:@"Save Location" forState:UIControlStateNormal];
     [saveButton addTarget:self action:@selector(saveLocation) forControlEvents:UIControlEventTouchUpInside];

     [self.view addSubview:saveButton];
}

- (BOOL)textFieldShouldReturn:(UITextField *)textField {
     [textField resignFirstResponder];
     return YES;
}

- (void)saveLocation {
     self.user.location = self.locationField.text;

     [User saveUser:self.user];

     [self dismissViewControllerAnimated:YES completion:nil];
}

- (void)saveUserWhenClosing {
     [User saveUser:self.user]; 
}

@end


// User.m
#import "User.h"
#import "AFJSONRequestOperation.h"
#import "TestingAppDelegate.h"
#import "Photo.h"

@implementation User

- (id)init
{
     self = [self initWithJSON];
     return self;
}

- (id)initWithJSON
{
     self = [super init];
     if(self) {        
          NSURL *url = [[NSURL alloc] initWithString:@"http://operation-models.codeschool.com/userProfile.json"];
          NSURLRequest *request = [[NSURLRequest alloc] initWithURL:url];

          AFJSONRequestOperation *operation = [AFJSONRequestOperation JSONRequestOperationWithRequest:request success:^(NSURLRequest *request, NSHTTPURLResponse *response, id JSON) {
               self.firstName = JSON[@"firstName"];
               self.lastName = JSON[@"lastName"];
               self.city = JSON[@"city"];
               self.profilePhoto = [[Photo alloc] initWithTitle:@"Profile Photo"
                    detail:@"detail"
                    filename:JSON[@"profilePhoto"]
                    thumbnail:JSON[@"profilePhotoThumbnail"]];
               self.biography = JSON[@"biography"];
               self.memberSince = JSON[@"memberSince"];

               self.location = @"no location yet";

               [[NSNotificationCenter defaultCenter] postNotificationName:@"initWithJSONFinishedLoading" object:nil];
          } failure:^(NSURLRequest *request, NSHTTPURLResponse *response, NSError *error, id JSON) {
               NSLog(@"NSError: %@",[error localizedDescription]);
          }];

          [operation start];

     }
     return self;
}

+(NSString *)getPathToArchive {
     NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
     NSString *docsDir = [paths objectAtIndex:0];
     return [docsDir stringByAppendingPathComponent:@"user.model"];
}

+(User *)getUser {
     return [NSKeyedUnarchiver unarchiveObjectWithFile:[User getPathToArchive]];
}

+(void)saveUser:(User *)aUser {
     [NSKeyedArchiver archiveRootObject:aUser toFile:[User getPathToArchive]];
}

-(void)encodeWithCoder:(NSCoder *)anEncoder {
     [anEncoder encodeObject:self.firstName forKey:@"firstName"];
     [anEncoder encodeObject:self.lastName forKey:@"lastName"];
     [anEncoder encodeObject:self.city forKey:@"city"];
     [anEncoder encodeObject:self.profilePhoto forKey:@"profilePhoto"];
     [anEncoder encodeObject:self.memberSince forKey:@"memberSince"];
     [anEncoder encodeObject:self.biography forKey:@"biography"];
     [anEncoder encodeObject:self.location forKey:@"location"];
}

-(id)initWithCoder:(NSCoder *)aDecoder {
     self = [super init];
     if(self) {
          self.firstName = [aDecoder decodeObjectForKey:@"firstName"];
          self.lastName = [aDecoder decodeObjectForKey:@"lastName"];
          self.city = [aDecoder decodeObjectForKey:@"city"];
          self.profilePhoto = [aDecoder decodeObjectForKey:@"profilePhoto"];
          self.memberSince = [aDecoder decodeObjectForKey:@"memberSince"];
          self.biography = [aDecoder decodeObjectForKey:@"biography"];
          self.location = [aDecoder decodeObjectForKey:@"location"];
     }
     return self;
}

-(NSString *)description;
{
     return [NSString stringWithFormat:@"[User: 
          firstName: %@ 
          lastName: %@ 
          city: %@ 
          profilePhoto: %@ 
          memberSince: %@ 
          biography: %@ 
          location:%@
          ]", self.firstName, self.lastName, self.city, self.profilePhoto, self.memberSince, self.biography, self.location];
}
@end

