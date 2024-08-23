from json import load

import draco
import numpy as np
import pandas as pd
import sklearn


def print_versions():
    message = f"Package Loaded. draco: {draco.__version__}, numpy: {np.__version__}, pandas: {pd.__version__}, sklearn: {sklearn.__version__}"
    print(message)
    return message

def print_kwargs(**kwargs):
    print(kwargs)
    return kwargs

def print_args(*args):
    print(args)
    return args

def print_args_kwargs(*args, **kwargs):
    print(args)
    print(kwargs)
    return args, kwargs