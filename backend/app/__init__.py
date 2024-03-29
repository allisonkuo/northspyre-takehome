from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    CORS(app)
    db.init_app(app)


    migrate = Migrate(app, db)

    from app.controllers.tasks import tasks_bp
    app.register_blueprint(tasks_bp)

    with app.app_context():
        # db.drop_all() # for debugging
        db.create_all()

    return app
