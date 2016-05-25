angular.module('app').controller('NewProject', ['Socket', 'ProjectFactory', '$scope', function (Socket, ProjectFactory, $scope) {
    var self = this;

    self.newCustomer = '';
    self.customers = [
        'ALK', 'GSK', 'Nutricia'
    ];

    self.project = {
        name: '',
        customer: ''
    };

    Socket.on('project', function (project) {
        console.log(project);
        ProjectFactory.setProject(project);
        go('import', project._id);
    });

    self.createProject = function () {
        console.log('Sent project');
        Socket.emit('new project', self.project);
    };

    self.addCustomer = function () {
        if (self.newCustomer !== '') {
            self.customers.push(self.newCustomer);
            self.customers.sort();
        }
    };

    self.selectCustomer = function (customer) {
        self.project.customer = customer;
    };

    $scope.$on('$destroy', function (event) {
        Socket.removeAllListeners();
    });

}]);