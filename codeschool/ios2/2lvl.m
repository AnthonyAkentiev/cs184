#import "User.h"
#import "AFJSONRequestOperation.h"

@implementation User

-(id)init
{
     self = [super init];
     return self;
}

-(id)initWithJSON
{
     NSURL *url = [[NSURL alloc] initWithString:@"http://operation-models.codeschool.com/userProfile.json"];
     NSURLRequest *request = [[NSURLRequest alloc] initWithURL:url];

     AFJSONRequestOperation *operation = [AFJSONRequestOperation JSONRequestOperationWithRequest:request success:^(NSURLRequest *request, NSHTTPURLResponse *response, id JSON) {
          self.firstName = JSON[@"firstName"];
          self.lastName = JSON[@"lastName"];
          self.city = JSON[@"city"];
          self.profilePhoto = JSON[@"profilePhoto"];
          self.profilePhotoThumbnail = JSON[@"profilePhotoThumbnail"];
          self.biography = JSON[@"biography"];
          self.memberSince = JSON[@"memberSince"];
     } failure:^(NSURLRequest *request, NSHTTPURLResponse *response, NSError *error, id JSON) {
          NSLog(@"NSError: %@",[error localizedDescription]);
     }];

     [operation start];
}


@end
